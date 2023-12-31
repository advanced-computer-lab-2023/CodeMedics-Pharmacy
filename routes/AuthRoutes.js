const express = require('express');
const router = express.Router();
const { registerPharmacist } = require('../controllers/Pharmacist/PharmacistController');
const {CreatePatient} = require('../controllers/Patient/CreatePatient');
const upload = require('../config/multerConfig');
const {loginUser , logout , auth} = require('../controllers/Auth/Login-out');
const {changePassword} = require('../controllers/Auth/ChangePassword');
const { getMe } = require('../controllers/auth/getMe');
const { getMePharmacist } = require('../controllers/Auth/getMePharmacist');


// User Registration
router.post('/registerPatient', CreatePatient);
router.post('/registerPharmacist', upload.fields([
  { name: 'IDDocument', maxCount: 1 },
  { name: 'pharmacyDegree', maxCount: 1 },
  { name: 'workingLicense', maxCount: 1 }
]), registerPharmacist);

// User Login
router.post('/login', loginUser);
router.post('/logout', logout);
router.post('/', auth);
router.post('/changePassword', changePassword);

router.get('/getMe', getMe);
router.get('/getMePharmacist', getMePharmacist);

module.exports = router;
