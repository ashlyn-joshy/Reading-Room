var express = require("express");
var router = express.Router();

//controller
const adminController = require("../controllers/admin");

router.post("/register", adminController.registerAdmin);
router.post("/login", adminController.adminLogin);
router.get("/alladmins", adminController.alladmin);
router.get("/:id", adminController.adminDetails);
router.delete("/:id/delete", adminController.deleteAdmin);
router.post("/logout", adminController.adminLogout);

module.exports = router;
