const mongoose = require("mongoose");
const MainCategory = require("./MainCategory");
const { Schema } = mongoose;

const subCategorySchema = new Schema({
    name: {type : String, required: true, unique: true},
    description: {type : String, required: true},
    createdAt: { type: Date, default: Date.now },
    MainCategory : { type: Schema.Types.ObjectId, ref: 'MainCategory' },
    Book : [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

module.exports = mongoose.model("SubCategory", subCategorySchema);