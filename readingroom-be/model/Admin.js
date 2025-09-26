const mongoose = require("mongoose");
const { Schema } = mongoose.Schema;

const adminSchema = new Schema({
  adminUsername: { type: String, require: true, unique: true },
  adminEmail: { type: String, require: true, unique: true },
  adminPassword: { type: String, require: true },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Admin", adminSchema);
