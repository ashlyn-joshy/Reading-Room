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