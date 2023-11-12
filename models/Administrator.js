const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    Username: {
        type: String,
        required: [true, 'Please enter a username']
    },
    Password: {
        type: String,
        required: [true, 'Please enter a password']
    }

}, {timestamps: true});

const Admin = mongoose.model('Adminstrator', adminSchema, 'Adminstrator');
module.exports = Admin;