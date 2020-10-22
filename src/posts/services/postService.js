const _ = require('underscore');
const { executeQuery } = require('../../mysql/db');
const logging = require('../../logging/logging');
const userService = require('../../users/services/userService');
const { CP1251_BULGARIAN_CI } = require('mysql2/lib/constants/charsets');

exports.createPost = async function (apiReference, opts) {
  try {
    await executeQuery(apiReference,
      'INSERT INTO `tb_posts` (author_id, title, text) VALUES (?, ?, ?)',
    [opts.author_id, opts.title, opts.text]
    );
    return;
  } catch (sqlError) {
    logging.logError(apiReference, {EVENT: 'createPost SQL Error', ERROR: sqlError});
    throw new Error();
  }
}

exports.likeUnlikePost = async function (apiReference, opts) {
  try {
    let isPostAlreadyLiked = await executeQuery(apiReference, 
      "SELECT * FROM `tb_like_relationship` WHERE post_id = ? and user_id = ?",
      [opts.post_id, opts.liked_by_id]
      );
    let updateLikesCount = 0;
    
    if (_.isEmpty(isPostAlreadyLiked) && opts.is_liked) {
      //if (opts.is_liked) { // no rlship exists and user likes post
        await executeQuery(apiReference,
         "INSERT INTO `tb_like_relationship` (post_id, user_id) VALUES (?,?)",
         [+opts.post_id, +opts.liked_by_id] );
        updateLikesCount = 1;
      //} // else {} // no rlship exists and user unlikes post
    }
    if (!_.isEmpty(isPostAlreadyLiked) && !opts.is_liked) {
      //if (!opts.is_liked) { // rlship exists and user unlikes post
        await executeQuery(apiReference,
          "DELETE FROM `tb_like_relationship` WHERE like_id = ?",
          [isPostAlreadyLiked[0].like_id] );
         updateLikesCount = -1;
      //} // else {} // rlship exists and user likes post
    }
    if (updateLikesCount != 0) {
      await executeQuery(apiReference,
        'UPDATE `tb_posts` SET no_likes = no_likes + ?  WHERE post_id = ?',
        [updateLikesCount, opts.post_id]
      );
    }
    return;
  } catch (sqlError) {
    logging.logError(apiReference, {EVENT: 'createComment SQL Error', ERROR: sqlError});
    throw new Error();
  }
}

exports.getPosts = async function (apiReference, opts) {
  try {
    let sql = 'SELECT p.post_id, p.author_id, u.first_name, p.title, p.text, p.creation_datetime, p.updated_datetime FROM `tb_posts` p INNER JOIN tb_users u on u.user_id = p.author_id ';
    let values = [];
    if (opts.home_feed) {
      // fetch only followed user posts
      let user_ids = await userService.getFollowedUsers(apiReference, opts.user_id);
      user_ids.push(opts.user_id);
      sql += ' WHERE p.author_id IN (?) ';
      values.push(user_ids);
    }
    if (opts.profile_feed) {
      sql += ' WHERE p.author_id = ? ';
      values.push(opts.user_id);
    }
    sql += ' ORDER BY p.creation_datetime DESC LIMIT ? OFFSET ?';
    values.push(opts.limit, opts.offset);
    console.log(sql);
    let posts = await executeQuery(apiReference, sql, values);
    return posts;
  } catch (sqlError) {
    logging.logError(apiReference, {EVENT: 'getPosts SQL Error', ERROR: sqlError});
    throw new Error();
  }
}