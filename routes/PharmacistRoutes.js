const express = require('express');
const router = express.Router();
const { registerPharmacist, getPharmacits } = require('../controllers/Pharmacist/PharmacistController');
const { getPharmacistMessages } = require('../controllers/Pharmacist/getPharmacistMessages');
const upload = require('../config/multerConfig'); 

router.post('/register', upload.fields([
    { name: 'IDDocument', maxCount: 1 },
    { name: 'pharmacyDegree', maxCount: 1 },
    { name: 'workingLicense', maxCount: 1 }
]), registerPharmacist);
router.get('/getPharmacits', getPharmacits);
router.get('/getPharmacistMessages', getPharmacistMessages);

module.exports = router;