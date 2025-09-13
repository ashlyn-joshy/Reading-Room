const mongoose = require("mongoose");

//models
const Badge = require('../model/Badges');

//create a new badge
module.exports.createBadge = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newBadge = new Badge({ name, description });
        //save the info to the database
        await newBadge.save();
        res.status(201).json(newBadge);
    } catch (error) {
        res.status(500).json({ error: 'Error creating badge', details: error.message });
    }
}