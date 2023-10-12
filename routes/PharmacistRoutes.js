const express = require('express');
const router = express.Router();
const {PharmacistContoller, createPharmacist} = require('../controllers/PharmacistContoller');

router.get('/Medicine', (req, res) => {
    PharmacistContoller.viewList(req, res);
});

router.get('/getPharmacists', (req, res) => {
    PharmacistContoller.getPharmacists(req, res);
});

router.post('/createPharmacist', createPharmacist);


module.exports = router;