const PPatient = require('../models/pharmacyPatient');
const Pharmacist = require("../models/Pharmacist");
const patientModel = require("../models/pharmacyPatient");
const Administrator = require("../models/Administrator");
// const PharmRequest = require("../models/pharmacistRequests");
const PharmRequest = require("../models/Pharmacist");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const upload = require('../config/multerConfig');
//The one with shopping cart
const anotherPatientModel = require('../models/Patient');

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (username) => {
    return jwt.sign({username}, 'supersecret', {
        expiresIn: maxAge
    });
};

// patient Registration
const registerPPatient = async (req, res) => {
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

        const existingUser = await anotherPatientModel.findOne({Username}) || await Pharmacist.findOne({Username}) || await Administrator.findOne({Username}) || await PharmRequest.findOne({Username});
        if (existingUser) {
            return res.status(400).json({message: 'Username already exists. Please choose another one.'});
        }
        const existingUser2 = await anotherPatientModel.findOne({Email}) || await Pharmacist.findOne({Email}) || await Administrator.findOne({Email}) || await PharmRequest.findOne({Email});
        if (existingUser2) {
            return res.status(400).json({message: 'email already exists. Please choose another one.'});
        }
        const existingUser4 = await anotherPatientModel.findOne({Number}) || await Pharmacist.findOne({Number}) || await Administrator.findOne({Number}) || await PharmRequest.findOne({Number});
        if (existingUser4) {
            return res.status(400).json({message: 'Number already exists. Please choose another one.'});
        }
        const ppatient = new anotherPatientModel({
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



module.exports = {registerPPatient, registerPharmacist, loginUser, logout, changePassword};
