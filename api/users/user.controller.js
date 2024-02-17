const {
  create,
  getUsers,
  getUserByUserId,
  getUserByUsername,
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;

    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "database connection errors",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getAllUser: (req, res) => {
    getUsers((error, result) => {
      if (error) {
        return res.json({
          success: 0,
          message: "Failed to Fetch all users",
        });
      }

      return res.json({
        success: 1,
        data: result,
      });
    });
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (error, results) => {
      if (error) {
        return res.json({
          success: false,
          message: "No user was Found",
        });
      }
      if (!results[0]) {
        return res.json({
          success: false,
          message: `Could not find user with id : ${id}`,
        });
      }

      return res.json({
        success: true,
        data: results,
      });
    });
  },
  getUserByUsername: (req, res) => {
    const username = req.body.username;
    getUserByUsername(username, (error, results) => {
      if (error) {
        return res.json({
          success: false,
          message: "Server Errors",
        });
      }
      if (!results[0]) {
        return res.json({
          success: false,
          message: `Could not find user : ${username}`,
        });
      }

      return res.json({
        success: true,
        data: results,
      });
    });
  },
  login: (req, res) => {
    const body = req.body;

    getUserByUsername(body.username, (err, results) => {
      if (err) {
        console.log(err);
      }

      if (!results) {
        return res.json({
          success: 0,
          data: "Wrong username",
        });
      }
      console.log(results.password);
      const result = compareSync(body.password, results.password);
      // console.log(result)

      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.JSON_KEY, {
          expiresIn: "30d",
        });

        return res.json({
          success: true,
          data: "Logged in Successfully",
          token: jsontoken,
        });
      } else {
        return res.json({
          success: 0,
          data: "Wrong password",
        });
      }
    });
  },
};
