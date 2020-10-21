const _ = require('underscore');

const db = require('../../mysql/db');
const logging = require('../../logging/logging');
const { CP1251_BULGARIAN_CI } = require('mysql2/lib/constants/charsets');

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
    sql += ' AND username = ? ';
    values.push(opts.username);
  }
  if (opts.password) {
    sql += ' AND password = ? ';
    values.push(opts.password);
  }
  if (opts.is_active) {
    sql += 'AND is_active = ? ';
    values.push(opts.is_active);
  }

  try {
    let results = await db.executeQuery(apiReference, sql, values);
    return results;
  } catch (sqlError) {
    logging.logError(apiReference, { EVENT: 'getUser SQL Error', ERROR: sqlError });
    throw new Error();
  }
}

exports.getFollowedUsers = async function (apiReference, user_id) {
  try {
    console.log('@@@');
    let results = await db.executeQuery(apiReference,
      'SELECT followed_id FROM `tb_follow_relationship` WHERE user_id = ? AND is_followed = 1',
      [user_id]);
    return results;
  } catch (sqlError) {
    logging.logError(apiReference, { EVENT: 'get followed User SQL Error', ERROR: sqlError });
    throw new Error();
  }
}

exports.getFollowStatus = async function (apiReference, opts) {
  try {
    let results = await db.executeQuery(apiReference,
      'SELECT * FROM `tb_follow_relationship` WHERE user_id = ? AND followed_id = ?',
      [opts.user_id, opts.profile_id]);
    return results;
  } catch (sqlError) {
    logging.logError(apiReference, { EVENT: 'get follow status SQL Error', ERROR: sqlError });
    throw new Error();
  }
}

exports.insertUser = async function (apiReference, opts) {
  try {
    let sql = 'INSERT INTO `tb_users` (first_name, username, password';
    let valuesql = ' VALUES (?,?,?';
    let values = [opts.first_name, opts.username, opts.password];
    if (opts.last_name) {
      sql += ', last_name'
      valuesql += ',?';
      values.push(opts.last_name);
    }
    if (opts.phone) {
      sql += ', phone';
      valuesql += ',?';
      values.push(opts.phone);
    }
    if (opts.email) {
      sql += ', email';
      valuesql += ',?';
      values.push(opts.email);
    }
    sql += ')';
    valuesql += ')';
    let results = await db.executeQuery(apiReference, sql + valuesql, values);
    return results;
  } catch (sqlError) {
    logging.logError(apiReference, { EVENT: 'signUp SQL Error', ERROR: sqlError });
    throw new Error();
  }
}

exports.userFollow = async function (apiReference, opts) {
  try {
    let getRelation = await db.executeQuery(apiReference,
      'SELECT * FROM `tb_follow_relationship` WHERE user_id = ? AND followed_id = ?',
      [opts.user_id, opts.to_follow_user_id]
    );
    if (_.isEmpty(getRelation)) {
      console.log(opts, '###');
      await db.executeQuery(apiReference,
        'INSERT INTO `tb_follow_relationship` (user_id,	followed_id, is_followed) VALUES (?,?,?)',
        [opts.user_id, opts.to_follow_user_id, opts.is_follow ? 1 : 0]);
    } else {
      getRelation = getRelation[0];
      if (getRelation.is_followed != opts.is_follow) {
        await db.executeQuery(
          apiReference,
          'UPDATE `tb_follow_relationship` SET is_followed = ? WHERE relation_id = ?',
          [opts.is_follow ? 1 : 0, getRelation.relation_id]
        );
      }
    }
    return;
  } catch (sqlError) {
    logging.logError(apiReference, { EVENT: 'getUser SQL Error', ERROR: sqlError });
    throw new Error();
  }
}

exports.searchQuery = async function (apiReference, opts) {
  try {
    console.log(opts.query);
    let results = await db.executeQuery(apiReference,
      `SELECT user_id, username, first_name FROM tb_users WHERE concat_ws(' ',first_name, last_name, username) like '%${opts.query}%'`,[]
    );
    return results;
  } catch(sqlError) {
    logging.logError(apiReference, { EVENT: 'Search SQL Error', ERROR: sqlError });
    throw new Error();
  }
}