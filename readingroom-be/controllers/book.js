const mongoose = require("mongoose");

//models
const Book = require("../model/Book");
const Badge = require("../model/Badges");
const MainCategory = require("../model/MainCategory");
const SubCategory = require("../model/SubCategory");

//create a new book
module.exports.createBook = async (req, res) => {
    try {
        const { title, author, description, isbn, publishedDate, pages, language, price, badgesId , subCategoryId, mainCategoryId } = req.body;
        // Validate required fields
        if (!title || !author || !isbn || !price || !subCategoryId || !mainCategoryId) {
            return res.status(400).json({ error: 'Title, author, ISBN, price, subCategoryId, and mainCategoryId are required' });
        }
        // Validate sub-category and main category existence
        const subCategory = await SubCategory.findById(subCategoryId);
        const mainCategory = await MainCategory.findById(mainCategoryId);
        if (!subCategory) {
            return res.status(400).json({ error: 'Invalid subCategoryId' });
        }
        if (!mainCategory) {
            return res.status(400).json({ error: 'Invalid mainCategoryId' });
        }
        const book = new Book({ title, author, description, isbn, publishedDate, pages, language, price, badges: badgesId, subCategory: subCategoryId, mainCategory: mainCategoryId });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Error creating book', details: error.message });
    }
}