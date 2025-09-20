const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubCategory = require("./SubCategory");
const Book = require("./Book");

const mainCategorySchema = new Schema({
    name: {type : String, required: true, unique: true},
    description: {type : String, required: true},
    SubCategory : [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }],
    createdAt: { type: Date, default: Date.now },
    Book : [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

module.exports = mongoose.model("MainCategory", mainCategorySchema);