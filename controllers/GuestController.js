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
        console.log("hello");
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
            return res.status(400).json('Username already exists. Please choose another one.');
        }
        const existingUser2 = await anotherPatientModel.findOne({Email}) || await Pharmacist.findOne({Email}) || await Administrator.findOne({Email}) || await PharmRequest.findOne({Email});
        if (existingUser2) {
            return res.status(400).json('email already exists. Please choose another one.');
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
        return res.status(500).json({error: error.message});
    }
};

const registerPharmacist = async (req, res) => {
    try {
        // Process the registration and uploaded files
        const {username, name, email, password, dob, gender, hourlyRate, affiliation, educationalBackground} = req.body;

        // Check for uploaded files
        if (!req.files || Object.keys(req.files).length !== 3) {
            return res.status(400).json({message: 'Please upload ID Document, Medical Degree, and Medical License'});
        }

        const {IDDocument, pharmacyDegree, workingLicense} = req.files;

        // Ensure that exactly one file is uploaded for each field
        if (!IDDocument || !pharmacyDegree || !workingLicense) {
            return res.status(400).json({message: 'Please upload one file for each of the following: ID Document, Medical Degree, Medical License'});
        }

        // Handle file uploads (files are available in req.files)
        const idDocumentFile = IDDocument[0].filename;
        const pharmacyDegreeFile = pharmacyDegree[0].filename;
        const workingLicenseFile = workingLicense[0].filename;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newPharm = new PharmRequest({
            username,
            name,
            email,
            password: hashedPassword,
            dob,
            gender,
            hourlyRate,
            affiliation,
            educationalBackground,
            IDDocument: idDocumentFile,
            pharmacyDegree: pharmacyDegreeFile,
            workingLicense: workingLicenseFile,
        });

        // Save the new PharmRequest to the database
        await newPharm.save();
        res.status(201).json(newPharm); // Respond with the created PharmRequest details
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({error: 'Error processing request', detailedError: error.message});
    }
};
//

const logout = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.status(200).json({message: "User logged out"});
}
// User Login
const loginUser = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        var patient = null, pharmacist = null, admin = null;
        if (username) {
            patient = await anotherPatientModel.findOne({Username: username});
            pharmacist = await PharmRequest.findOne({Username: username});
            admin = await Administrator.findOne({Username: username});
        }
        if (email) {
            patient = await anotherPatientModel.findOne({email});
            pharmacist = await PharmRequest.findOne({Email: email});
            admin = await Administrator.findOne({Email: email});
        }
        if (!patient && !pharmacist && !admin) {
            return res.status(404).json({message: 'User not found'});
        }

        if (patient) {
            const auth = await bcrypt.compare(password, patient.Password);
            if (auth) {
                const token = createToken(patient.Username);
                res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
                return res.status(200).json({Type: 'Patient', message: 'Login successful', patient, token});
            } else {
                return res.status(401).json({message: 'Wrong password'});
            }
        } else if (pharmacist) {
            const auth = await bcrypt.compare(password, pharmacist.Password);
            if (auth && pharmacist.Status != "Approved") {
                return res.status(401).json({message: `Your account is ${pharmacist.Status}`});

            }
            if (auth) {
                const token = createToken(pharmacist.Username);
                res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
                return res.status(200).json({Type: 'Pharmacist', message: 'Login successful', pharmacist, token});
            } else {
                console.log('Wrong password');
                return res.status(401).json({message: 'Wrong password'});
            }
        } else if (admin) {

            const auth = await bcrypt.compare(password, admin.Password);
            if (auth) {
                const token = createToken(admin.Username);
                res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
                return res.status(200).json({Type: 'Admin', message: 'Login successful', admin, token});
            } else {
                return res.status(401).json({message: 'Wrong password'});
            }
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const changePassword = async (req, res) => {
    try {
        const {username, newPassword} = req.body;
        console.log("HERE IN CHANGEPASSWORD");
        const patient = await anotherPatientModel.findOne({Username: username});
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        patient.Password = hashedPassword;
        await patient.save();
        return res.status(200).json("Changed Password Successfully");

    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
};

module.exports = {registerPPatient, registerPharmacist, loginUser, logout, changePassword};
