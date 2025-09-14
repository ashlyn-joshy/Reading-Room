var express = require('express');
var router = express.Router();

//controllers
const BadgeController = require('../controllers/badgeController');

//routes
router.get('/allbadges', BadgeController.getAllBadges);
router.post('/', BadgeController.createBadge);
router.put('/update/:id', BadgeController.updateBadge);

module.exports = router;
