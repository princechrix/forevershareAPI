const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, process.env.JSON_KEY, (err, decode) => {
        if (err) {
          res.json({
            success: false,
            message: "Invalid Token",
          });
        } else {
          next();
        }
      });
    } else {
      res.json({
        success: 0,
        message: "Access Denied! unauthorized user",
      });
    }
  },
};
