const express = require('express');
const router = express.Router();
const { registerPPatient, loginUser, registerPharmacist } = require('../controllers/GuestController');
const upload = require('../config/multerConfig');
const {auth} = require('../controllers/AdminController');


// User Registration
router.post('/register', registerPPatient);
router.post('/Pharmregister', upload.fields([
  { name: 'IDDocument', maxCount: 1 },
  { name: 'pharmacyDegree', maxCount: 1 },
  { name: 'workingLicense', maxCount: 1 }
]), registerPharmacist);

// User Login
router.post('/login', loginUser);
// router.post('/', auth);

module.exports = router;
