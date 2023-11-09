const adminModel = require('../models/Administrator.js');
//const pharmacistModel = require('../models/Pharmacist.js');
//const patientModel = require('../models/pharmacyPatient.js');
const {default: mongoose} = require('mongoose');
const getUsername = require('../config/usernameGetter');
const medicineModel = require('../models/Medicine.js');
const pharmacyPatientModel = require('../models/pharmacyPatient.js');

const viewList = async (req, res) => {
    //get list of all medicine
    try {
        const medicines = await Medicine.find({}, 'Name Description Price ImageURL');
        // Send the list of medicines as JSON response
        res.json(medicines);
    } catch (error) {
        console.error('Error fetching medicines:', error);
        res.status(500).json({ message: 'Error fetching medicines' });
    }
}


module.exports = {viewList};