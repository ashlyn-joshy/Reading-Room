import SubCategory from "./SubCategory";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const mainCategorySchema = new Schema({
    name: {type : String, required: true, unique: true},
    description: {type : String, required: true},
    SubCategory : [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MainCategory", mainCategorySchema);