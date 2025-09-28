const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const bcrypt = require("bcrypt");

const adminSchema = new Schema({
  adminUsername: { type: String, require: true, unique: true },
  adminEmail: { type: String, require: true, unique: true },
  adminPassword: { type: String, require: true },
  createdAt: { type: Date, default: Date.now() },
});

//static function for register admin
adminSchema.statics.adminRegister = async function (
  adminUsername,
  adminEmail,
  adminPassword
) {
  const existingAdmin = await this.findOne({
    $or: [{ adminUsername }, { adminEmail }],
  });
  if (existingAdmin) {
    throw new Error("Admin is Existing with the same Email or Username");
  }
  if (!validator.isEmail(adminEmail)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(adminPassword)) {
    throw new Error(
      "Password is not strong enough. It should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(adminPassword, salt);
  const admin = new this({
    adminUsername,
    adminEmail,
    adminPassword: hashedPassword,
  });
  await admin.save();
  return admin;
};

module.exports = mongoose.model("Admin", adminSchema);
