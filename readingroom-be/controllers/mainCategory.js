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