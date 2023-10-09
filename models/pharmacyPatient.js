const mongoose = require('mongoose');


const pharmacyPatientSchema = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    emergencyContact: {
        fullName: { type: String, required: true },
        mobileNumber: { type: String, required: true },
        relation: { type: String, required: true }
    }
});

const PharmacyPatientModel = mongoose.model('PharmacyPatient', pharmacyPatientSchema); // Change the model name to 'PharmacyPatient'

module.exports = PharmacyPatientModel;
