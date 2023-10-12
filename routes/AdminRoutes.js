const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const {createAdmin, viewPharmacistApplications, viewPharmacists, viewPatients, searchMedicine, getMedicalUses, getMedicinesByMedicalUse} = require('../controllers/AdminController');

router.post('/createAdmin', createAdmin);

router.delete('/removePharmacist', (req, res) => {
    AdminController.removePharmacist(req, res);
});
router.delete('/removePatient', (req, res) => {
    AdminController.removePatient(req, res);
});
// router.get('/viewMedicines', (req, res) => {
//     AdminController.viewMedicines(req, res);
// });
router.get('/searchMedicine', (req, res) => {
    AdminController.searchMedicine(req, res);
});
router.get('/getMedicalUses', (req, res) => {
    AdminController.getMedicalUses(req, res);
});
router.get('/getMedicinesByMedicalUse', (req, res) => {
    AdminController.getMedicinesByMedicalUse(req, res);
});

router.get('/viewPharmacists', viewPharmacists);
router.get('/viewPharmacistApplications', viewPharmacistApplications);
router.get('/viewPatients', viewPatients);
// router.get('/viewMedicines', viewMedicines);
router.get('/searchMedicine', searchMedicine);
router.get('/getMedicalUses', getMedicalUses);
router.get('/getMedicinesByMedicalUse', getMedicinesByMedicalUse);


module.exports = router;