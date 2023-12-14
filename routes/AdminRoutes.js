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
const {TotalSales, SalesPerMonth} = require('../controllers/TotalSales');

// ================== Admins ==================
router.post('/createAdmin', createAdmin);
router.get('/TotalSales', TotalSales);
router.get('/SalesPerMonth', SalesPerMonth);


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