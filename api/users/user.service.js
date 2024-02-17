const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `INSERT INTO users(username, password) VALUES(?, ?)`,
      [data.username, data.password],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }

        return callback(null, results);
      }
    );
  },
  getUsers: (callback) => {
    pool.query(
      `SELECT user_id, username from users`,
      [],
      (error, results, field) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getUserByUserId: (id, callback) => {
    pool.query(
      `SELECT user_id, username FROM users WHERE user_id = ?`,
      [id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getUserByUsername: (username, callback) => {
    pool.query(
      `SELECT * FROM users WHERE username = ?`, 
      [username], 
      (error, results, fields) => {
        if(error) {
          return callback(error)
        } 
        // console.log(results)
        return callback(null, results[0])
      }
    )
  },

  

  login: (data, callback) => {
    pool.query(
      `SELECT * FROM users WHERE username = ? AND password = ?`, 
      [
        data.username,
        data.password
      ], 
      (err, results) => {
        if(err) {
          return callback(err)
        } 
        return callback(null, results)
      }
    )
  }
  
};


