const express = require('express');
const router = express.Router();
const {registerPharmacist, getPharmacits} = require('../controllers/Pharmacist/PharmacistController');


router.post('/register', registerPharmacist);
router.get('/getPharmacits', getPharmacits);

module.exports = router;