const express = require('express');
const GuestController = require('../controllers/GuestController');

const router = express.Router();

// User Registration
router.post('/register', GuestController.registerPPatient);
router.post('/Pharmregister', GuestController.registerPharmacist);

// User Login
router.post('/login', GuestController.loginUser);

module.exports = router;
