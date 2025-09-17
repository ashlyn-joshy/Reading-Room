const mongoose = require("mongoose");

//models
const SubCategory = require("../model/SubCategory");
const MainCategory = require("../model/MainCategory");

//create a main-category
module.exports.createMainCategory = async (req, res) => {
    try {
        const { name, description, subCategoryIds } = req.body;
        const mainCategory = new MainCategory({ name, description, SubCategory: subCategoryIds });
        await mainCategory.save();
        res.status(201).json(mainCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error creating main-category', details: error.message });
    }
}

//display all main-categories
module.exports.getAllMainCategories = async (req, res) => {
    try {
        const mainCategories = await MainCategory.find().populate('SubCategory');
        res.status(200).json(mainCategories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching main-categories', details: error.message });
    }
}

//add a sub-category to a main-category
module.exports.addSubCategoryToMainCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { subCategoryId } = req.body;

        //validate ids
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(subCategoryId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const mainCategory = await MainCategory.findById(id);
        if (!mainCategory) {
            return res.status(404).json({ error: 'Main-category not found' });
        }
        const subCategory = await SubCategory.findById(subCategoryId);
        if (!subCategory) {
            return res.status(404).json({ error: 'Sub-category not found' });
        }
        mainCategory.SubCategory.push(subCategoryId);
        await mainCategory.save();
        res.status(200).json(mainCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error adding sub-category to main-category', details: error.message });
    }
}