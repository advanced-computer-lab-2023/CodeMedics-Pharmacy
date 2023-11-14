const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacistReqSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    //gender: { type: String, enum: ['male', 'female', 'other'], required: false },
    hourlyRate: { type: Number, required: true },
    affiliation: { type: String, required: true },
    educationalBackground: { type: String, required: true },
    IDDocument: { type: String, required: false }, // Path or reference to the uploaded ID document
    pharmacyDegree: { type: String, required: false }, // Path or reference to the uploaded pharmacy degree
    workingLicense: { type: String, required: false } // Path or reference to the uploaded working license
},
{ timestamps: true });

const pharmacistRequests = mongoose.model('pharmacistRequests', pharmacistReqSchema);

module.exports = pharmacistRequests;