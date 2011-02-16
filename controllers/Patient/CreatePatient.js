const Administrator = require('../../models/Administrator');
const Pharmacist = require('../../models/Pharmacist');
const Patient = require('../../models/Patient');
const {default: mongoose} = require('mongoose');
// const getUsername = require('../config/usernameGetter');
const Medicine = require('../../models/Medicine');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const maxAge = 3 * 24 * 60 * 60;
const createToken = (username) => {
    return jwt.sign({username}, 'supersecret', {
        expiresIn: maxAge
    });
};

// patient Registration
const CreatePatient = async (req, res) => {
    try {
        const {
            FirstName,
            LastName,
            Username,
            Password,
            Email,
            NationalID,
            DateOfBirth,
            Number,
            Gender,
            EmergencyContactName,
            EmergencyContactNumber,
            EmergencyContactRelation
        } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const existingUser = await Patient.findOne({Username}) || await Pharmacist.findOne({Username}) || await Administrator.findOne({Username});
        if (existingUser) {
            return res.status(400).json({message: 'Username already exists. Please choose another one.'});
        }
        const existingUser2 = await Patient.findOne({Email}) || await Pharmacist.findOne({Email}) || await Administrator.findOne({Email});
        if (existingUser2) {
            return res.status(400).json({message: 'email already exists. Please choose another one.'});
        }
        const existingUser4 = await Patient.findOne({Number}) || await Pharmacist.findOne({Number}) || await Administrator.findOne({Number});
        if (existingUser4) {
            return res.status(400).json({message: 'Phone Number already exists. Please choose another one.'});
        }
        const ppatient = new Patient({
            FirstName,
            LastName,
            Username,
            Password: hashedPassword,
            Email,
            NationalID,
            DateOfBirth,
            Number,
            Gender,
            EmergencyContacts: {
                EmergencyContactName: EmergencyContactName,
                EmergencyContactNumber: EmergencyContactNumber,
                EmergencyContactRelation: EmergencyContactRelation
            }
        });
        await ppatient.save();
        return res.status(200).json("Patient created successfully");
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};


module.exports = {viewList , CreatePatient};