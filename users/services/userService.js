const db = require('./../../mysql/db');

export async function getUser(apiReference, opts) {
  let sql = `SELECT ${opts.columns || '*'} FROM tb_users WHERE 1=1 `;
  let values = [];
  if (opts.access_token) {
    sql += ' AND access_token = ? ';
    values.push(opts.access_token);
  }
  if (opts.user_id) {
    sql += ' AND user_id = ? ';
    values.push(opts.user_id);
  }
  if (opts.username) {
    sql += 'AND username = ? ';
  }

  try {
    let results = await db.executeQuery(apiReference, sql, values);
    return results;
  } catch (sqlError) {
    logging.logError(apiReference, {EVENT: 'getUser SQL Error', ERROR: sqlError});
    throw new Error();
  }


}