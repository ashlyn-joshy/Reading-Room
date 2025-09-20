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

//show the details of a book
module.exports.getBookDetails = async (req, res) => {
    try {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid book ID' });
        }
        const book = await Book.findById(id)
            .populate('badges')
            .populate('subCategory')
            .populate('mainCategory');
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book details', details: error.message });
    }
}

//update book details
module.exports.updateBook = async (req, res) => {
    try {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid book ID' });
        }
        const { title, author, description, isbn, publishedDate, pages, language, price } = req.body;
        const book = await Book.findByIdAndUpdate(id, { title, author, description, isbn, publishedDate, pages, language, price }, { new: true });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Error updating book details', details: error.message });
    }
}

//delete a book
module.exports.deleteBook = async (req, res) => {
    try {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid book ID' });
        }
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting book', details: error.message });
    }
}

//display all books
module.exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()
            .populate('badges')
            .populate('subCategory')
            .populate('mainCategory');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching books', details: error.message });
    }
}