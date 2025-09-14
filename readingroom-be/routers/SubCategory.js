const express = require('express');
const router = express.Router();

//controllers
const SubCategoryController = require('../controllers/subCategory');

//routes
router.post('/', SubCategoryController.createSubCategory);

module.exports = router;