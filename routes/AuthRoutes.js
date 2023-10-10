const express = require('express');
const { registerPPatient, loginUser, registerPharmacist } = require('../controllers/GuestController');

const router = express.Router();

// User Registration
router.post('/register', registerPPatient);
router.post('/Pharmregister', registerPharmacist);

// User Login
router.post('/login', loginUser);

module.exports = router;
