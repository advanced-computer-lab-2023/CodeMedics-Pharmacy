const express = require('express');
const router = express.Router();

const {viewMedicinesPharmacist,viewMedicines, multerMiddleware, addMedicine, editMedicine, archiveMedicine,
    unarchiveMedicine} = require('../controllers/Pharmacist/MedicineController');


router.get('/viewMedicinesPharmacist', viewMedicinesPharmacist);
router.get('/viewMedicines', viewMedicines);
router.post('/addMedicine', multerMiddleware,addMedicine);
router.patch('/editMedicine', editMedicine);
router.patch('/archiveMedicine', archiveMedicine);
router.patch('/unarchiveMedicine', unarchiveMedicine);

module.exports = router;