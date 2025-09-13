const mongoose = require('mongoose');
const { Schema } = mongoose;

const BadgeSchema = new Schema({
    name : { type: String, required: true, unique: true },
    description : String,
    createdAt : { type: Date, default: Date.now }
})

module.exports = mongoose.model('Badge', BadgeSchema);