const express = require("express");
const router = express.Router();

//controllers
const MainCategory = require("../controllers/mainCategory");

router.post('/', MainCategory.createMainCategory)

module.exports = router;