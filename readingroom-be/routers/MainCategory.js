const express = require("express");
const router = express.Router();

//controllers
const MainCategory = require("../controllers/mainCategory");

router.post('/', MainCategory.createMainCategory);
router.get('/all', MainCategory.getAllMainCategories);

module.exports = router;