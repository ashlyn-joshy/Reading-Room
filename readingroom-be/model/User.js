const mongoose = require('mongoose');
const {Schema} =  mongoose;
const bcrypt = require('bcrypt');

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
    const user = new this({ username, email, password: hashedPassword });
    await user.save();
    return user;
}

module.exports = mongoose.model('User', userSchema);