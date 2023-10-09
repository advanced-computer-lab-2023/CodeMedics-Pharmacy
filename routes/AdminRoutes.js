const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

router.post('/createAdmin', (req, res) => {
    AdminController.createAdmin(req, res);
});
router.delete('/removePharmacist', (req, res) => {
    AdminController.removePharmacist(req, res);
});
router.delete('/removePatient', (req, res) => {
    AdminController.removePatient(req, res);
});



module.exports = router;