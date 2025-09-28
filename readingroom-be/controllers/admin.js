const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

//models
const Admin = require("../model/Admin");

//create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

//register a new admin
module.exports.registerAdmin = async (req, res) => {
  try {
    const { adminUsername, adminEmail, adminPassword } = req.body;
    const newAdmin = await Admin.adminRegister(
      adminUsername,
      adminEmail,
      adminPassword
    );
    const token = createToken(newAdmin._id);
    //set cookies
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      email: newAdmin.adminEmail,
      token: token,
      message: "Admin is created",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to register admin", error: error.message });
  }
};
