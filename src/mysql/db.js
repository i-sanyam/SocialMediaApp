const { createConnection } = require('mysql2');

const logging = require('../logging/logging');

const connection = createConnection({
  host: 'localhost',
  user: 'socialappuser',
  password: 'socialpass',
  database: 'socialdb'
});

exports.executeQuery = function (apiReference, queryString, params) {
  return new Promise((resolve, reject) => {
    let query = connection.query(queryString, params, (sqlError, sqlResult) => {
      logging.log(apiReference, {
        QUERY: query.sql,
        SQL_ERROR: sqlError,
        SQL_RESULT: sqlResult,
        SQL_RESULT_LENGTH: sqlResult && sqlResult.length
      });
      if (sqlError) {
        return reject({ ERROR: sqlError, QUERY: query.sql });
      }
      return resolve(sqlResult);
    });
  })
}