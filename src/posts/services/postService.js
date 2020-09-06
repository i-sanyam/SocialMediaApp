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

exports.likePost = async function (apiReference, opts) {
  try {
    let value = opts.is_liked ? 1 : -1;
    await executeQuery(apiReference,
      'UPDATE `tb_posts` SET likes = likes + ?  WHERE post_id = ?',
      [value, opts.comment_id]
    );
    // to implement like post rlshp
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