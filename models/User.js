const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
    PhoneNumber: {type: Number, required: true},
    email: {type: String, unique: true, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
