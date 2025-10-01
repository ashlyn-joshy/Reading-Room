const express = require("express");
const router = express.Router();

//controllers
const SubCategoryController = require("../controllers/subCategory");
//Authentication
const adminAuth = require("../middleware/adminAuth");

//routes
router.get("/", SubCategoryController.getAllSubCategories);
router.get("/:id", SubCategoryController.getSubCategoryById);

router.post("/", adminAuth, SubCategoryController.createSubCategory);
router.put("/update/:id", adminAuth, SubCategoryController.updateSubCategory);
router.delete(
  "/delete/:id",
  adminAuth,
  SubCategoryController.deleteSubCategory
);

module.exports = router;
