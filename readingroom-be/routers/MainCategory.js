const express = require("express");
const router = express.Router();

//controllers
const MainCategory = require("../controllers/mainCategory");
//Authentication
const adminAuth = require("../middleware/adminAuth");

router.get('/all', MainCategory.getAllMainCategories);
router.get('/:id', MainCategory.getMainCategoryDetails);

router.post('/', adminAuth, MainCategory.createMainCategory);
router.put('/:id/addSubCategory', adminAuth,MainCategory.addSubCategoryToMainCategory);
router.put('/:id/removeSubCategory',adminAuth, MainCategory.removeSubCategoryFromMainCategory);
router.delete('/:id/delete',adminAuth, MainCategory.deleteMainCategory);
router.put('/:id/update',adminAuth, MainCategory.updateMainCategory);

module.exports = router;