// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define the Medicine Schema
// const medicineSchema = new Schema({
//     Name: {
//         type: String,
//         required: [true, 'Please enter a name']
//     },
//     Description: {
//         type: String,
//         required: [true, 'Please enter a description']
//     },
//     Price: {
//         type: Number,
//         required: [true, 'Please enter a price']
//     },
//     ImageURL: {
//         type: String, // You can store the URL to the medicine's image
//         required: true, // Make it required if you want to ensure an image URL is always present
//     },
//     // You can add more fields here as needed for your medicine data
// }, { timestamps: true });

// // Create the Medicine Model
// const Medicine = mongoose.model('Medicine', medicineSchema, 'Medicines');

// // Export the Medicine Model
// module.exports = Medicine;



// ADDING MEDICINE ROUTE

// const express = require('express');
// const router = express.Router();
// const addMedicine = require('./controllers/MedicineController');

// // Route to handle adding a new medicine
// router.post('/addMedicine', MedicineController.addMedicine);

// module.exports = router;
