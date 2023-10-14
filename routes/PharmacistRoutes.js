const express = require('express');
const router = express.Router();
const PharmacistContoller = require('../controllers/PharmacistController');
// const {createPharmacist, viewMedicines} = require('../controllers/PharmacistContoller');
const {viewMedicines, createPharmacist} = require('../controllers/PharmacistController');


// router.get('/viewMedicines', (req, res) => {
//     PharmacistContoller.viewMedicines(req, res);
// });
router.get('/getPharmacists', (req, res) => {
    PharmacistContoller.getPharmacists(req, res);
});

router.post('/createPharmacist', createPharmacist);

//router.get('/viewMedicines', viewMedicines);

module.exports = router;