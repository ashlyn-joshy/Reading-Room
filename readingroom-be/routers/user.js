const express = require('express');
const router = express.Router();

//controllers
const Users = require('../controllers/user');

router.post('/createuser', Users.createUser);

module.exports = router;
