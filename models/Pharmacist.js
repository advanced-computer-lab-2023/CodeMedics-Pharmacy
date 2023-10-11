const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacistSchema = new Schema({
    Name: {
        type: String,
        required: [true, 'Please enter a name']
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
        required: [true, 'Please enter an email']
    },
    DateOfBirth: {
        type: Date,
        required: [true, 'Please enter a Date of Birth']
    },
    HourlyRate: {
        type: Number,
        required: [true, 'Please enter an hourly rate']
    },
    affiliation: {
        type: String,
        required: [true, 'Please enter an affiliation']
    },
    Degree: {
        type: String,
        required: [true, 'Please enter a degree']
    }
}, {timestamps: true});

const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema , 'Pharmacists');
module.exports = Pharmacist;
