const express = require('express');
const { registerPPatient, loginUser } = require('../controllers/GuestController');

const router = express.Router();

// User Registration
router.post('/register', registerPPatient);

// User Login
router.post('/login', loginUser);

module.exports = router;
