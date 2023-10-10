const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicineSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter the medicine name'],
    },
    activeIngredients: {
        type: [String],
        required: [true, 'Please enter the active ingredients'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter the price'],
        min: [0, 'Price cannot be negative'],
    },
    medicalUse: {
        type: String,
        required: [true, 'Please enter the medical use'],
    },
    availableQuantity: {
        type: Number,
        required: [true, 'Please enter the available quantity'],
        min: [0, 'Quantity cannot be negative'],
    },
}, { timestamps: true });


const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
