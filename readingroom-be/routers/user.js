const express = require("express");
const router = express.Router();

//controllers
const Users = require("../controllers/user");
//Authentication
const adminAuth = require("../middleware/adminAuth");

//routes
router.post("/register", Users.registerNewUser);
router.post("/login", Users.userLogin);
router.get("/:id", Users.getUserDetails);
router.put("/:id/update", Users.updateUser);
router.delete("/:id/delete", Users.deleteUser);

router.get("/allusers", adminAuth, Users.getAllUsers);

module.exports = router;
