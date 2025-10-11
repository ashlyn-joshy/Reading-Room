const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { transporter } = require("../config/nodemailer");
const { welcomeEmail } = require("../Emails/welcomeEmail");
const { LoginEmail } = require("../Emails/loginEmail");

//models
const User = require("../model/User");

//create token
const createToken = (id) => {
  return jwt.sign({ id, isUser: true }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

//create new user
module.exports.registerNewUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.register(username, email, password);
    const token = createToken(newUser._id);
    //set cookies
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    //send email notification
    try {
      await transporter.sendMail(welcomeEmail(newUser.username, newUser.email));
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError.message);
    }

    res.status(201).json({
      email: newUser.email,
      token: token,
      message: "New user created",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in creating new user", error: error.message });
  }
};

//user login
module.exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken(user._id);
    //set cookies
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    //send mail notification
    try {
      await transporter.sendMail(LoginEmail(user.username, user.email));
    } catch (emailError) {
      console.error(
        "Failed to send login notification email:",
        emailError.message
      );
    }
    res.status(200).json({
      message: "user login",
      email: user.email,
      token: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in user login", error: error.message });
  }
};

//get user details
module.exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching user details",
      error: error.message,
    });
  }
};

//get all users
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in fetching users", error: error.message });
  }
};

//update user details
module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    const checkExistingUsername = await User.findOne({
      username,
      _id: { $ne: id },
    });
    if (checkExistingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const checkExistingEmail = await User.findOne({ email, _id: { $ne: id } });
    if (checkExistingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true }
    ).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User details updated successfully", user });
  } catch (error) {
    res.status(500).json({
      message: "Error in updating user details",
      error: error.message,
    });
  }
};

//delete user
module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in deleting user", error: error.message });
  }
};
