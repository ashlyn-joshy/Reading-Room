const express = require("express");
const router = express.Router();

//controllers
const MainCategory = require("../controllers/mainCategory");

router.post('/', MainCategory.createMainCategory);
router.get('/all', MainCategory.getAllMainCategories);
router.put('/:id/addSubCategory', MainCategory.addSubCategoryToMainCategory);
router.put('/:id/removeSubCategory', MainCategory.removeSubCategoryFromMainCategory);
router.delete('/:id/delete', MainCategory.deleteMainCategory);
router.get('/:id', MainCategory.getMainCategoryDetails);
router.put('/:id/update', MainCategory.updateMainCategory);

module.exports = router;