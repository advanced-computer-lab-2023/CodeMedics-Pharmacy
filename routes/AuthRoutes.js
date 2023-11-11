const express = require('express');
const { registerPPatient, loginUser, registerPharmacist } = require('../controllers/GuestController');
const upload = require('../config/multerConfig');
const router = express.Router();

// User Registration
router.post('/register', registerPPatient);
router.post('/Pharmregister', upload.fields([
  { name: 'IDDocument', maxCount: 1 },
  { name: 'pharmacyDegree', maxCount: 1 },
  { name: 'workingLicense', maxCount: 1 }
]), registerPharmacist);

// User Login
router.post('/login', loginUser);

module.exports = router;
