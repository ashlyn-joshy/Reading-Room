var express = require('express');
var router = express.Router();

//controllers
const BadgeController = require('../controllers/badgeController');

//routes
router.post('/', BadgeController.createBadge);

module.exports = router;
