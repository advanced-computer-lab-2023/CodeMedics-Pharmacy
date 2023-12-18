const express = require('express');
const router = express.Router();
const {registerPharmacist, getPharmacits, addSalary} = require('../controllers/Pharmacist/PharmacistController');
const {getPharmacistMessages} = require('../controllers/Pharmacist/getPharmacistMessages');
const upload = require('../config/multerConfig');
const {getOrders} = require('../controllers/Pharmacist/getOrders');

router.post('/register', upload.fields([
    {name: 'IDDocument', maxCount: 1},
    {name: 'pharmacyDegree', maxCount: 1},
    {name: 'workingLicense', maxCount: 1}
]), registerPharmacist);
router.get('/getPharmacits', getPharmacits);
router.patch('/addSalary', addSalary);
router.get('/getPharmacistMessages', getPharmacistMessages);
router.get('/getOrders', getOrders);

module.exports = router;