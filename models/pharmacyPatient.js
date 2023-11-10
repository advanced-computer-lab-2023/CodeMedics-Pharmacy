const mongoose = require('mongoose');
const Prescription = require('./Prescription');
const Cart = require('./Cart');

const pharmacyPatientSchema = new mongoose.Schema({
    username: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    dob: {type: Date, required: true},
    gender: {type: String, required: true},
    mobileNumber: {type: String, required: true},
    emergencyContact: {
        fullName: {type: String, required: true},
        mobileNumber: {type: String, required: true},
        relation: {type: String, required: true}
    },
    HealthPackage: {
        type: {
            Name: String,
            membership: String, // Free, Silver, Gold, Platinum
            status: String, // Subscribed, Unsubscribed
            Price: Number,
            date: Date
        },
        default: {
            membership: "Free",
            status: "Not Subscribed",
            date: Date.now()
        },
        required: false
    },
    Wallet: {
        type: Number,
        default: 0,
        required: false
    },
    Cart: {
        type: Cart.schema,
        required: false
    }
});

const PharmacyPatientModel = mongoose.model('PharmacyPatient', pharmacyPatientSchema); // Change the model name to 'PharmacyPatient'

module.exports = PharmacyPatientModel;
