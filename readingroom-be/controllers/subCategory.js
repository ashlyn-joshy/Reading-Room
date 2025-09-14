const mongoose = require('mongoose');

//models
const SubCategory = require('../model/SubCategory');

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