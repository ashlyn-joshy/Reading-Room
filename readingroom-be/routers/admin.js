var express = require("express");
var router = express.Router();

//controller
const adminController = require("../controllers/admin");

router.post("/register", adminController.registerAdmin);

module.exports = router;
