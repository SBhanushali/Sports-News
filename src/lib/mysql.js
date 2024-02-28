const mysql = require("mysql2");
const config = require("../../config/config");

const pool = mysql.createPool({
  host: config.database.host,
  user: config.database.username,
  password: config.database.password,
  database: config.database.database,
});

function query(sql, args) {
  return new Promise((resolve, reject) => {
    pool.query(sql, args, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function handleQueryError(error) {
  switch (error.code) {
    case "ER_NO_REFERENCED_ROW_2":
      throw new Error("Foreign key constraint violation error");
    case "ER_DUP_ENTRY":
      throw new Error("Duplicate entry error");
    case "ER_PARSE_ERROR":
      throw new Error("SQL parse error");
    default:
      throw new Error("Error executing SQL query");
  }
}

module.exports = {
  query: query,
  handleQueryError: handleQueryError,
};
