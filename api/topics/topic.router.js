const { addTopic } = require("./topic.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/topic", checkToken, addTopic);

module.exports = router;
