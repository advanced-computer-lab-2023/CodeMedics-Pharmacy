const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    FirstName: {
        type: String,
        default: '',
        required: [true, 'Please enter a name']
    },
    LastName: {
        type: String,
        default: '',
        required: [true, 'Please enter a name']
    },
    AddressLine: {
        type: String,
        default: '',
        required: [true, 'Please enter an address line']
    },
    AddressLine2: {
        type: String,
        required: false,
        default: ''
    },
    City: {
        type: String,
        default: '',
        required: [true, 'Please enter a city']
    },
    PostalCode: {
        type: String,
        default: '',
        required: false
    },
    PatientUsername: {
        type: String,
        default: ''
    },
} , {timestamps: true});

const Address = mongoose.model('Address', AddressSchema, 'Address');
module.exports = Address;
