var express = require("express");
var router = express.Router();

//controllers
const BadgeController = require("../controllers/badgeController");
//Authentication
const adminAuth = require("../middleware/adminAuth");

//routes
router.get("/allbadges", BadgeController.getAllBadges);
router.post("/", adminAuth, BadgeController.createBadge);
router.put("/update/:id", adminAuth, BadgeController.updateBadge);
router.get("/:id", adminAuth, BadgeController.getBadge);
router.delete("/delete/:id", adminAuth, BadgeController.deleteBadge);

module.exports = router;
