const express = require('express');
const router = express.Router();
const {registerPharmacist, getPharmacits} = require('../controllers/Pharmacist/PharmacistController');
const {getPharmacistMessages} = require('../controllers/Pharmacist/getPharmacistMessages');

router.post('/register', registerPharmacist);
router.get('/getPharmacits', getPharmacits);
router.get('/getPharmacistMessages', getPharmacistMessages);

module.exports = router;