const { createUser, getAllUser, getUserByUserId, getUserByUsername, login } = require("./user.controller");
const router = require("express").Router();
const {checkToken} = require("../../auth/token_validation")

 
router.post('/users', createUser);
router.get('/users',checkToken, getAllUser);
router.get('/users/:id',checkToken,  getUserByUserId)
router.get('/users/s/:username',checkToken, getUserByUsername)
router.post("/login", login);

module.exports = router