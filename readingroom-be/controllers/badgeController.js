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

//Display All Badges
module.exports.getAllBadges = async (req, res) => {
    try {
        const badges = await Badge.find();
        res.status(200).json(badges);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching badges', details: error.message });
    }
}

//update a badge info
module.exports.updateBadge = async (req, res) => {
    try {
        const {id} = req.params;
        //check if the id is valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such badge'});
        }
        const {name, description} = req.body;
        //update the badge
        const updateBadge = await Badge.findByIdAndUpdate(id, {name, description}, {new: true});
        res.status(200).json(updateBadge);
    } catch (error) {
        res.status(500).json({ error: 'Error updating badge', details: error.message });
    }
}