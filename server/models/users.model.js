const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;