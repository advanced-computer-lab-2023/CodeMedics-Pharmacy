const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    PatientId: {
        type: String
    },
    status : {
        type: String,
        enum: ['Ordered', 'Delivered']
    },
    amount : {
        type: Number
    },
    isWallet : {    
        type: Boolean
    },
    items: {
        type: [String]
    }
}, {timestamps: true});

const Order = mongoose.model('Doctor', OrderSchema, 'Doctors');
module.exports = Doctor;