const express = require('express');
const router = express.Router();

const {viewMedicinesPharmacist,viewMedicines, addMedicine, editMedicine} = require('../controllers/Pharmacist/MedicineController');


router.get('/viewMedicinesPharmacist', viewMedicinesPharmacist);
router.get('/viewMedicines', viewMedicines);
router.post('/addMedicine', addMedicine);
router.patch('/editMedicine', editMedicine);


module.exports = router;


