import { executeQuery } from '../../mysql/db';
const logging = require('./../../logging/logging');
const userService = require('../../users/services/userService');

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

export async function getPosts (apiReference, opts) {
  try {
    let sql = 'SELECT FROM `tb_posts` '
    let values = [];
    if (opts.home_feed) {
      // fetch only followed user posts
      let user_ids = await getFollowedUsers(apiReference, opts.user_id);
      sql += ' WHERE author_id IN (?) ';
      values.push(user_ids);
    }
    sql += ' ORDER BY `creation_datetime` DESC LIMIT ? OFFSET ?';
    values.push(opts.limit, opts.offset);
    let posts = await executeQuery(apiReference, sql, values);
    return posts;
  } catch (sqlError) {
    logging.logError(apiReference, {EVENT: 'createComment SQL Error', ERROR: sqlError});
    throw new Error();
  }
}