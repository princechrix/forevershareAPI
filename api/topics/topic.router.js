const { addTopic, topics } = require("./topic.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/topic", checkToken, addTopic);
router.get("/topic", topics)

module.exports = router;
