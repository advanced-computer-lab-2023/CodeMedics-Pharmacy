const PPatient = require('../models/pharmacyPatient');
const Pharmacist = require("../models/Pharmacist");
const patientModel = require("../models/pharmacyPatient");
const Administrator = require("../models/Administrator");
const PharmRequest = require("../models/pharmacistRequests");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const multer = require('multer');
const path = require('path');

//The one with shopping cart
const anotherPatientModel = require('../models/Patient');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination directory for storing uploaded files
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext) // Set the filename of the uploaded file
    }
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 } // Set a limit of 5MB per file
});

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (username) => {
    return jwt.sign({ username }, 'supersecret', {
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
            Gender
        } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const existingUser = await anotherPatientModel.findOne({ Username }) || await Pharmacist.findOne({ Username }) || await Administrator.findOne({ Username }) || await PharmRequest.findOne({ Username });
        if (existingUser) {
            return res.status(400).json('Username already exists. Please choose another one.');
        }
        const existingUser2 = await anotherPatientModel.findOne({ Email }) || await Pharmacist.findOne({ Email }) || await Administrator.findOne({ Email }) || await PharmRequest.findOne({ Email });
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
            Gender
        });
        await ppatient.save();
        return res.status(200).json("Patient created successfully");
    } catch (error) {
        return res.status(500).json({ error: 'Error creating user' });
    }
};

const registerPharmacist = (req, res) => {
    // Set up the multer middleware before this function
    // Use upload.fields middleware to handle file uploads for 'IDDocument', 'pharmacyDegree', 'workingLicense'

    // Handle the file upload and registration
    upload.fields([
        { name: 'IDDocument', maxCount: 1 },
        { name: 'pharmacyDegree', maxCount: 1 },
        { name: 'workingLicense', maxCount: 1 }
    ])(req, res, async (err) => {
        if (err) {
            console.error('File upload failed:', err);
            return res.status(500).json({ error: 'File upload failed', detailedError: err.message });
        }

        try {
            // Process the registration and uploaded files
            const { username, name, email, password, dob, gender, hourlyRate, affiliation, educationalBackground } = req.body;

            // Check if files are present
            if (!req.files) {
                return res.status(400).json({ error: 'No files uploaded' });
            }

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
                IDDocument: req.files['IDDocument'][0].path,
                pharmacyDegree: req.files['pharmacyDegree'][0].path,
                workingLicense: req.files['workingLicense'][0].path
            });

            // Save the new PharmRequest to the database
            await newPharm.save();
            res.status(201).json(newPharm); // Respond with the created PharmRequest details
        } catch (error) {
            console.error('Error processing request:', error);
            res.status(500).json({ error: 'Error processing request', detailedError: error.message });
        }
    });
};

const logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: "User logged out" });
}


// User Login
const loginUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        var patient = null, pharmacist = null, admin = null;
        if (username) {
            patient = await anotherPatientModel.findOne({ Username: username });
            pharmacist = await PharmRequest.findOne({ username });
            admin = await Administrator.findOne({Username: username });
        } if (email) {
            patient = await anotherPatientModel.findOne({ email });
            pharmacist = await PharmRequest.findOne({ email });
            admin = await Administrator.findOne({Email: email });
        }
        if (!patient && !pharmacist && !admin) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (patient) {
            const auth = await bcrypt.compare(password, patient.Password);
            if (auth) {
                const token = createToken(patient.Username);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                return res.status(200).json({ Type: 'Patient', message: 'Login successful' , patient , token});
            }
            else {
                return res.status(401).json({ message: 'Wrong password' });
            }
        } else if (pharmacist) {
            const auth = await bcrypt.compare(password, pharmacist.password);
            if (auth) {
                const token = createToken(pharmacist.username);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                return res.status(200).json({ Type: 'Pharmacist', message: 'Login successful' , pharmacist , token});
            }
            else {
                return res.status(401).json({ message: 'Wrong password' });
            }
        } else if (admin) {
            const auth = await bcrypt.compare(password, admin.Password);
            if (auth) {
                const token = createToken(admin.Username);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                return res.status(200).json({ Type: 'Admin', message: 'Login successful' , admin , token});
            }
            else {
                return res.status(401).json({ message: 'Wrong password' });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { registerPPatient, registerPharmacist, upload, loginUser, logout };
