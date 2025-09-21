const mongoose = require('mongoose');

//models
const User = require('../model/User');

//create new user
module.exports.createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        //check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if(existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        const newUser = new User({ username, email, password, role });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
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

//get all users - role : users only
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').where('role').equals('user');
        res.status(200).json({ users });
    } catch (error) {
       res.status(500).json({ message: 'Error in fetching users', error: error.message }); 
    }
}

//get all admins - role : admins only
module.exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await User.find({role: 'admin'}).select('-password');
        res.status(200).json({ admins });
    } catch (error) {
        res.status(500).json({ message: 'Error in fetching admins', error: error.message });
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