const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacistSchema = new Schema({
    Name: {
        type: String,
        required: false,
    },
    Username: {
        type: String,
        required: [true, 'Please enter a username']
    },
    Password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    Email: {
        type: String,
        required: false,
    },

}, {timestamps: true});

const Pharmacist = mongoose.model('Pharmacist', adminSchema, 'Pharmacists');
module.exports = Pharmacist;