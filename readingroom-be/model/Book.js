const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    isbn: { type: String, unique: true, required: true },
    publishedDate: { type: Date },
    pages: { type: Number },
    language: { type: String },
    price: { type: Number, required: true },
    badges: [{ type: Schema.Types.ObjectId, ref: 'Badge' }],
    subCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory', required: true },
    mainCategory : { type: Schema.Types.ObjectId, ref: 'MainCategory', required: true },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Book', bookSchema);