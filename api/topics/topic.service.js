const pool = require("../../config/database");

module.exports = {
  createTopic: (data, callback) => {
    pool.query(
      `INSERT INTO topics(topic_name, creator_id) VALUES(?, ?)`,
      [data.topicName, data.userId],
      (error, results) => {
        if (error) {
          return callback(error);
        }

        return callback(null, results);
      }
    );
  },
  getTopics: (callback) => {
    pool.query(`SELECT * FROM topics`, [], (error, results, fields) => {
      if(error) {
        return callback(error)
      } 
      return callback(null, results)
    })
  }
};
