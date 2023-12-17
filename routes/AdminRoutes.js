const express = require('express');
const router = express.Router();
const {createAdmin} = require('../controllers/Admin/AdminsController');
const {
    viewPharmacists,
    viewPharmacistApplications,
    acceptPharmacist,
    rejectPharmacist,
    removePharmacist
} = require('../controllers/Admin/PharmacistsController');
const {removePatient, viewPatients} = require('../controllers/Admin/PatientsController');
const {
    getSalesPerYear,
    getSalesDataByMedicine,
} = require('../controllers/TotalSales');

// ================== Admins ==================
router.post('/createAdmin', createAdmin);
router.get('/getSalesPerYear', getSalesPerYear);
router.get('/getSalesDataByMedicine', getSalesDataByMedicine);


// ================== Pharmacists ==================
router.get('/viewPharmacists', viewPharmacists);
router.get('/viewPharmacistApplications', viewPharmacistApplications);
router.patch('/acceptPharmacist', acceptPharmacist);
router.patch('/rejectPharmacist', rejectPharmacist);
router.delete('/removePharmacist', removePharmacist);

// ================== Patients ==================

router.delete('/removePatient', removePatient);
router.get('/viewPatients', viewPatients);

module.exports = router;