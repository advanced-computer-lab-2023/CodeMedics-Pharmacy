const adminModel = require('../models/Administrator.js');
const pharmacistModel = require('../models/Pharmacist.js');
const patientModel = require('../models/pharmacyPatient.js');
const {default: mongoose} = require('mongoose');
const getUsername = require('../config/infoGetter.js');
const medicineModel = require('../models/Medicine.js');
const jwt = require('jsonwebtoken');

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (username) => {
    return jwt.sign({ username }, 'supersecret', {
        expiresIn: maxAge
    });
};


// const viewMedicines = async (req, res) => {
//     try {
//         const medicines = await medicineModel.find();

//         if (!medicines || medicines.length === 0) {
//             return res.status(404).json({ message: 'No medicines found.' });
//         }
       
//         return res.status(200).json({ medicines });
//     } catch (error) {
//         return res.status(500).json({ error: 'Failed to fetch pharmacists.' });
//     }
// };

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
        const token = createToken(Username);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        return res.status(200).json(newPharmacist);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create a new admin.' });
    }
};





module.exports = { getPharmacits, createPharmacist};