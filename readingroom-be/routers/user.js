const express = require('express');
const router = express.Router();

//controllers
const Users = require('../controllers/user');

router.post('/createuser', Users.createUser);
router.get('/:id', Users.getUserDetails);
router.get('/', Users.getAllUsers);

module.exports = router;
