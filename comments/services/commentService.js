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

exports.likeComment = async function (apiReference, opts) {
  try {
    let value = opts.is_liked ? 1 : -1;
    await executeQuery(apiReference,
      'UPDATE `tb_comments` SET likes = likes + ?  WHERE comment_id = ?',
      [value, opts.comment_id]
    );
    // to implement like comment rlshp
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