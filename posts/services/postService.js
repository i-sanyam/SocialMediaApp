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