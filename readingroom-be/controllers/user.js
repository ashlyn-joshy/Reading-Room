const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//models
const User = require('../model/User');

//create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
}

//create new user
module.exports.registerNewUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.register(username, email, password);
        res.status(201).json({ email : newUser.email, token: createToken(newUser._id) });
    } catch (error) {
        res.status(500).json({ message: 'Error in creating new user', error: error.message });
    }
}

//get user details 
module.exports.getUserDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error in fetching user details', error: error.message });
    }
}

//get all users
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ users });
    } catch (error) {
       res.status(500).json({ message: 'Error in fetching users', error: error.message }); 
    }
}

//update user details
module.exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;
        const checkExistingUsername = await User.findOne({ username, _id: { $ne: id } });
        if(checkExistingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const checkExistingEmail = await User.findOne({ email, _id: { $ne: id } });
        if(checkExistingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const user = await User.findByIdAndUpdate(id, { username, email }, { new: true }).select('-password');
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User details updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error in updating user details', error: error.message });
    }
}

//delete user
module.exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error in deleting user', error: error.message });
    }
}