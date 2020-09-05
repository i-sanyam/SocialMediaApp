import { executeQuery } from '../../mysql/db';
const logging = require('./../../logging/logging');

export async function createPost (apiReference, opts) {
  try {
    await executeQuery(apiReference,
      'INSERT INTO `tb_posts` (author_id, text) VALUES (?, ?)',
    [opts.author_id, opts.text]
    );
    return;
  } catch (sqlError) {
    logging.logError(apiReference, {EVENT: 'createPost SQL Error', ERROR: sqlError});
    throw new Error();
  }
}

export async function likePost (apiReference, opts) {
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