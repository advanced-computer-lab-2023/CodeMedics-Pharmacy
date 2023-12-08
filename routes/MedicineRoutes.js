const express = require('express');
const router = express.Router();

const {viewMedicinesPharmacist,viewMedicines, multerMiddleware, addMedicine, editMedicine} = require('../controllers/Pharmacist/MedicineController');


router.get('/viewMedicinesPharmacist', viewMedicinesPharmacist);
router.get('/viewMedicines', viewMedicines);
router.post('/addMedicine', multerMiddleware,addMedicine);
router.patch('/editMedicine', editMedicine);

module.exports = router;