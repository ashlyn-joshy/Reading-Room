const express = require('express');
const router = express.Router();

//controllers
const Users = require('../controllers/user');

router.post('/createuser', Users.createUser);
router.get('/allusers', Users.getAllUsers);
router.get('/alladmins', Users.getAllAdmins);
router.get('/:id', Users.getUserDetails);
router.put('/:id/update', Users.updateUser);

module.exports = router;
