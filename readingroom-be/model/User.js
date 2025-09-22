const mongoose = require('mongoose');
const {Schema} =  mongoose;
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

//static method for the user register 
userSchema.statics.register = async function(username, email, password) {
    const existingUser = await this.findOne({ $or: [{ username }, { email }] });
    if(existingUser) {
        throw new Error('Username or email already exists');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    if(!validator.isStrongPassword(password)) {
        throw new Error('Password is not strong enough. It should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
    }
    if(!validator.isEmail(email)) {
        throw new Error('Email is not valid');
    }
    const user = new this({ username, email, password: hashedPassword });
    await user.save();
    return user;
}

module.exports = mongoose.model('User', userSchema);