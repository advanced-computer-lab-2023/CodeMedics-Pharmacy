const adminModel = require('../models/Administrator.js');
const pharmacistModel = require('../models/Pharmacist.js');
const patientModel = require('../models/pharmacyPatient.js');
const {default: mongoose} = require('mongoose');
const getUsername = require('../config/infoGetter.js');
const medicineModel = require('../models/Medicine.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
    const existingEmail = await adminModel.findOne({ Email });

    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists. Please choose another one.' });
    }

    if (existingEmail) {
        return res.status(400).json({ error: 'Email already in Use. Please Enter another one.' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        const newPharmacist = new pharmacistModel({ Name, Username, Password: hashedPassword, Email, DateOfBirth, HourlyRate, affiliation, Degree });
        await newPharmacist.save();
        return res.status(200).json({newPharmacist});
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create a new Pharmacist.' });
    }
};





module.exports = { getPharmacits, createPharmacist};