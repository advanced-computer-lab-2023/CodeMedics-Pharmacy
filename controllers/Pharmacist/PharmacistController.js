const adminModel = require('../../models/Administrator.js');
const pharmacistModel = require('../../models/Pharmacist.js');
const patientModel = require('../../models/pharmacyPatient.js');
const asyncHandler = require('express-async-handler');  
const {default: mongoose} = require('mongoose');
const getUsername = require('../../config/infoGetter.js');
const medicineModel = require('../../models/Medicine.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (username) => {
    return jwt.sign({username}, 'supersecret', {
        expiresIn: maxAge
    });
};


const getPharmacits = async (req, res) => {
    try {
        const pharmacistNames = await pharmacistModel.find();
        res.json(pharmacistNames);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

const addSalary = async(req, res) => {
    try{
        const {username} = req.query;
        const pharmacist = await pharmacistModel.findOne({Username: username});
        const salaryAmount = pharmacist.HourlyRate * 8 * 21;
        pharmacist.Wallet += salaryAmount;
        await pharmacist.save();
        return res.status(200).json({message: "Salary Sent Successfully"});

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}; 

const registerPharmacist = asyncHandler(async (req, res) => {
    try {
        // Process the registration and uploaded files
        const {Name, Username, Password, Email, DateOfBirth, HourlyRate, affiliation, Degree} = req.body;
        // Check for uploaded files
        const {IDDocument, pharmacyDegree, workingLicense} = req.files;
        // Handle file uploads (files are available in req.files)
        const idDocumentFile = IDDocument[0].filename;
        const pharmacyDegreeFile = pharmacyDegree[0].filename;
        const workingLicenseFile = workingLicense[0].filename;
        // Ensure that exactly one file is uploaded for each field

        if (!req.files || Object.keys(req.files).length !== 3) {
            return res.status(400).json({message: 'Please upload ID Document, Medical Degree, and Medical License'});
        }
        const found = await pharmacistModel.find({Username: Username});
        const found2 = await pharmacistModel.find({Email: Email});
        if (found.length > 0 || found2.length > 0) {
            return res.status(400).json({message: 'Username or Email already exists. Please choose another one.'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const newPharm = new pharmacistModel({
            Username,
            Name,
            Email,
            Password: hashedPassword,
            DateOfBirth,
            HourlyRate,
            affiliation,
            Degree,
            IDDocument: idDocumentFile,
            pharmacyDegree: pharmacyDegreeFile,
            workingLicense: workingLicenseFile,
        });

        // Save the new PharmRequest to the database
        await newPharm.save();
        res.status(201).json(newPharm); // Respond with the created PharmRequest details
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({message: 'Error processing request', detailedError: error.message});
    }
});




module.exports = { getPharmacits, registerPharmacist, addSalary};