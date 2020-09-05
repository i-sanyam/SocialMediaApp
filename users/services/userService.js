const db = require('./../../mysql/db');

exports.getUser = async function (apiReference, opts) {
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

exports.getFollowedUsers = async function (apiReference, user_id) {
  try {
    let results = await db.executeQuery(apiReference,
      'SELECT followed_id FROM `tb_follow_relationship` WHERE user_id = ? AND is_followed = 1',
      [user_id]);
    return results;
  } catch (sqlError) {
    logging.logError(apiReference, {EVENT: 'getUser SQL Error', ERROR: sqlError});
    throw new Error();
  }
}