const { executeQuery } = require('../../mysql/db');
const logging = require('./../../logging/logging');

exports.createComment = async function (apiReference, opts) {
  try {
    await executeQuery(apiReference,
      'INSERT INTO `tb_comments` (author_id, post_id, text) VALUES (?, ?, ?)',
      [opts.author_id, opts.post_id, opts.text]
    );
    return;
  } catch (sqlError) {
    logging.logError(apiReference, {EVENT: 'createComment SQL Error', ERROR: sqlError});
    throw new Error();
  }
}

exports.likeUnlikeComment = async function (apiReference, opts) {
  try {
    let isCommentAlreadyLiked = await executeQuery(apiReference, 
      "SELECT * FROM `tb_comment_relationship` WHERE comment_id = ? and user_id = ?",
      [opts.comment_id, opts.liked_by_id]
      );
    let updateLikesCount = 0;
    
    if (_.isEmpty(isCommentAlreadyLiked) && opts.is_liked) {
      //if (opts.is_liked) { // no rlship exists and user likes post
        await executeQuery(apiReference,
         "INSERT INTO `tb_comment_relationship` (comment_id, user_id) VALUES (?,?)",
         [+opts.comment_id, +opts.liked_by_id] );
        updateLikesCount = 1;
      //} // else {} // no rlship exists and user unlikes post
    }
    if (!_.isEmpty(isCommentAlreadyLiked) && !opts.is_liked) {
      //if (!opts.is_liked) { // rlship exists and user unlikes post
        await executeQuery(apiReference,
          "DELETE FROM `tb_comment_relationship` WHERE comment_like_id = ?",
          [isCommentAlreadyLiked[0].comment_like_id] );
         updateLikesCount = -1;
      //} // else {} // rlship exists and user likes post
    }
    if (updateLikesCount != 0) {
      await executeQuery(apiReference,
        'UPDATE `tb_comments` SET no_likes = no_likes + ?  WHERE comment_id = ?',
        [updateLikesCount, opts.comment_id]
      );
    }
    return;
  } catch (sqlError) {
    logging.logError(apiReference, {EVENT: 'createComment SQL Error', ERROR: sqlError});
    throw new Error();
  }
}

exports.getComments = async function (apiReference, opts) {
  try {
    let comments = await executeQuery(apiReference,
      'SELECT FROM `tb_comments` WHERE post_id = ? ORDER BY `creation_datetime` DESC LIMIT ? OFFSET ?',
      [opts.post_id, opts.limit, opts.offset]
    );
    // to implement like comment rlshp
    return comments;
  } catch (sqlError) {
    logging.logError(apiReference, {EVENT: 'createComment SQL Error', ERROR: sqlError});
    throw new Error();
  }
}