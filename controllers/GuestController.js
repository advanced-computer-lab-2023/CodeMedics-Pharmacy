const PPatient = require('../models/pharmacyPatient');
const Pharmacist = require("../models/Pharmacist");
const patientModel = require("../models/pharmacyPatient");
const Administrator = require("../models/Administrator");
const PharmRequest = require("../models/pharmacistRequests");

const multer = require('multer');
const path = require('path');


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

// patient Registration
const registerPPatient = async (req, res) => {
    try {
        console.log("hello");
      const {
            username,
            name,
            email,
            password,
            dob,
            gender,
            mobileNumber,
            emergencyContact
        } = req.body;
        console.log(req.body)
        
    const existingUser = await patientModel.findOne({username}) || await Pharmacist.findOne({username}) || await Administrator.findOne({username}) || await PharmRequest.findOne({username});
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists. Please choose another one.' });
        }
    const existingUser2 = await patientModel.findOne({email}) || await Pharmacist.findOne({email}) || await Administrator.findOne({email}) || await PharmRequest.findOne({email}) ;
        if (existingUser2) {
            return res.status(400).json({ error: 'email already exists. Please choose another one.' });
        }
        const ppatient = new PPatient({
            username,
            name,
            email,
            password,
            dob,
            gender,
            mobileNumber,
            emergencyContact
        });

        await ppatient.save();
        res.status(200).json(ppatient);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
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

            const newPharm = new PharmRequest({
                username,
                name,
                email,
                password,
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



// User Login
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await PPatient.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'No user found' });
        }

        if (user.password === password) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Wrong password' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error during login' });
    }
};

module.exports = { registerPPatient,registerPharmacist, upload, loginUser };
