const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacistReqSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    hourlyRate: { type: Number, required: true },
    affiliation: { type: String, required: true },
    educationalBackground: { type: String, required: true }
}, { timestamps: true });

const pharmacistRequests = mongoose.model('pharmacistRequests', pharmacistReqSchema);

module.exports = pharmacistRequests;