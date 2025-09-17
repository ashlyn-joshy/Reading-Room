const mongoose = require('mongoose');

//models
const SubCategory = require('../model/SubCategory');
const MainCategory = require('../model/MainCategory');

//create a new sub-category
module.exports.createSubCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newSubCategory = new SubCategory({ name, description });
        //save the info to the database
        await newSubCategory.save();
        res.status(201).json(newSubCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error creating sub-category', details: error.message });
    }
}

//show all the sub-categories
module.exports.getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find();
        res.status(200).json(subCategories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching sub-categories', details: error.message });
    }
}

//information about a specific sub-category
module.exports.getSubCategoryById = async (req, res) => {
    try {
        const {id} = req.params;
        // invalid id
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid sub-category ID' });
        }
        const subCategory = await SubCategory.findById(id);
        if(!subCategory) {
            return res.status(404).json({ error: 'Sub-category not found' });
        }
        res.status(200).json(subCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching sub-category', details: error.message });
    }
}

//update a specific sub-category
module.exports.updateSubCategory = async (req, res) => {
    try {
        const {id} = req.params;
        const { name, description } = req.body;
        // invalid id
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid sub-category ID' });
        }
        const updateSubCategory = await SubCategory.findByIdAndUpdate(id, { name, description }, { new: true });
        if(!updateSubCategory) {
            return res.status(404).json({ error: 'Sub-category not found' });
        }
        res.status(200).json(updateSubCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error updating sub-category', details: error.message });
    }
}

//delete a specific sub-category
//From the main category, the sub-category should be removed first before deleting the sub-category itself.
module.exports.deleteSubCategory = async (req, res) => {
    try {
        const {id} = req.params;
        //invalid id
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid sub-category ID' });
        }
        const subCategory = await SubCategory.findById(id);
        if(!subCategory) {
            return res.status(404).json({ error: 'Sub-category not found' });
        }
        //remove the sub-category from any main-category that references it
        await MainCategory.updateMany(
            { SubCategory: id },
            { $pull: { SubCategory: id } }
        );
        await subCategory.deleteOne();
        res.status(200).json({ message: 'Sub-category deleted successfully and also removed form the Main-category' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting sub-category', details: error.message });
    }
}