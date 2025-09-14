const express = require('express');
const router = express.Router();

//controllers
const SubCategoryController = require('../controllers/subCategory');

//routes
router.post('/', SubCategoryController.createSubCategory);
router.get('/', SubCategoryController.getAllSubCategories);
router.get('/:id', SubCategoryController.getSubCategoryById);
router.put('/update/:id', SubCategoryController.updateSubCategory);
router.delete('/delete/:id', SubCategoryController.deleteSubCategory);

module.exports = router;