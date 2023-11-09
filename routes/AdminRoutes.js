const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const {createAdmin, removePharmacist, removePatient, viewPharmacistApplications, viewPharmacists, viewPatients} = require('../controllers/AdminController');

// router.post('/createAdmin', (req, res) => {
//     createAdmin;
// });

router.post('/createAdmin', (req, res) => {
    AdminController.createAdmin(req, res).then();
});

//router.post('/createAdmin', createAdmin);
router.delete('/removePharmacist',removePharmacist);
router.delete('/removePatient', removePatient);
router.get('/iewPharmacists', viewPharmacists);
router.get('/iewPharmacistApplications',viewPharmacistApplications);
router.get('/iewPatients',viewPatients);
// router.get('/viewMedicines', viewMedicines);
// router.get('/getMedicalUses', getMedicalUses);
// router.get('/getMedicinesByMedicalUse', getMedicinesByMedicalUse);



module.exports = router;

