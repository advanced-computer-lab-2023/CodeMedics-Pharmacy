// const express = require('express');
// const PharmacyPatientModel = require('./models/pharmacyPatient');
// const GuestController = require('./controllers/GuestController');
// const router = express.Router();

// // router.post('/registerPPatient',(req,res) =>{
// //     GuestController.registerPPatient(req,res).then();
// // });

// // router.post('/loginUser',(req,res) =>{
// //     GuestController.loginUser(req,res).then();
// // });




// // Route for user registration
// router.post('/register', (req, res) => {
//     const {
//         username,
//         name,
//         email,
//         password,
//         dob,
//         gender,
//         mobileNumber,
//         emergencyContact
//     } = req.body;

//     // Check if the user already exists
//     PharmacyPatientModel.findOne({ username: username })
//         .then(existingUser => {
//             if (existingUser) {
//                 // User already registered
//                 return res.status(400).json({ message: "User already registered" });
//             }

//             // Create a new user
//             PharmacyPatientModel.create(req.body)
//                 .then(newUser => {
//                     res.status(201).json(newUser);
//                 })
//                 .catch(err => {
//                     res.status(500).json({ error: err.message });
//                 });
//         })
//         .catch(err => {
//             res.status(500).json({ error: err.message });
//         });
// });

// // Route for user login
// router.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     // Find the user by email
//     PharmacyPatientModel.findOne({ email: email })
//         .then(user => {
//             if (!user) {
//                 // No user found
//                 return res.status(404).json({ message: "No user found" });
//             }

//             // Check if the password matches
//             if (user.password === password) {
//                 res.status(200).json({ message: "Login successful" });
//             } else {
//                 res.status(401).json({ message: "Wrong password" });
//             }
//         })
//         .catch(err => {
//             res.status(500).json({ error: err.message });
//         });
// });

// module.exports = router;