import { executeQuery } from '../../mysql/db';
const logging = require('./../../logging/logging');

export async function createComment (apiReference, opts) {
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

export async function likeComment (apiReference, opts) {
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