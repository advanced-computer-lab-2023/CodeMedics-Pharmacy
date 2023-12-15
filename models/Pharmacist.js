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
        type: String,
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
    },
    IDDocument: {type: String}, // Path or reference to the uploaded ID document
    pharmacyDegree: {type: String}, // Path or reference to the uploaded pharmacy degree
    workingLicense: {type: String},// Path or reference to the uploaded working license
    Status: {
        type: String,
        enum: ['Approved', 'Pending', 'Rejected'],
        default: 'Pending',
        required: false,
    },Messages: {
        type: [{
            sender: String,
            content: String,
            timestamp: { type: Date, default: Date.now },
        }],
        default: [],
        required: false,
    },

}, {timestamps: true});

const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema, 'Pharmacists');
module.exports = Pharmacist;
