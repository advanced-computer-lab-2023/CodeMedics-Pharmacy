const adminModel = require('../models/Administrator.js');
const pharmacistModel = require('../models/Pharmacist.js');
const patientModel = require('../models/pharmacyPatient.js');
const {default: mongoose} = require('mongoose');
const getUsername = require('../config/usernameGetter');
const medicineModel = require('../models/Medicine.js');


const viewList = async (req, res) => {
    try {
        const medicines = await Medicine.find({}, 'Name Description Price ImageURL');
        res.json(medicines);
    } catch (error) {
        console.error('Error fetching medicines:', error);
        res.status(500).json({ message: 'Error fetching medicines' });
    }
}

const getPharmacits = async (req, res) => {
    try {
        const pharmacistNames = await Pharmacist.find({}, 'Name');
    
        res.json(pharmacistNames);
      } catch (error) {
        console.error('Error fetching pharmacist names:', error);
        res.status(500).json({ message: 'Error fetching pharmacist names' });
      }
};

const createPharmacist = async (req, res) => {
    const {Name, Username, Password, Email, DateOfBirth, HourlyRate, affiliation, Degree } = req.body;

    const existingUser = await adminModel.findOne({ Username }) || await pharmacistModel.findOne({ Username }) || await patientModel.findOne({ Username });

    if (existingUser) {
        return res.status(400).json({ error: 'Username already exists. Please choose another one.' });
    }

    try {
        const newPharmacist = new pharmacistModel({ Name, Username, Password, Email, DateOfBirth, HourlyRate, affiliation, Degree });
        await newPharmacist.save();
        return res.status(200).json(newPharmacist);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create a new admin.' });
    }
};





module.exports = {viewList, getPharmacits, createPharmacist};