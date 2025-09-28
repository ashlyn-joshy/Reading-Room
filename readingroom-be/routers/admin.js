var express = require("express");
var router = express.Router();

//controller
const adminController = require("../controllers/admin");

router.post("/register", adminController.registerAdmin);
router.post("/login", adminController.adminLogin);
router.get("/alladmins", adminController.alladmin);

module.exports = router;
