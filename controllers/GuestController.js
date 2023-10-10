const PPatient = require('../models/pharmacyPatient');
const Pharmacist = require("../models/Pharmacist");
const patientModel = require("../models/pharmacyPatient");
const Administrator = require("../models/Administrator");
const PharmRequest = require("../models/pharmacistRequests");
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
        
    const existingUser = patientModel.findOne({username}) || await Pharmacist.findOne({username}) || await Administrator.findOne({username})  ;
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists. Please choose another one.' });
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

//Pharmacist
const registerPharmacist = async (req, res) => {
    try {
        console.log("hello");
      const {
            username,
            name,
            email,
            password,
            dob,
            gender,
            hourlyRate, 
            affiliation , 
            educationalBackground
        } = req.body;
        console.log(req.body)
        
    const existingUser = patientModel.findOne({username}) || await Pharmacist.findOne({username}) || await Administrator.findOne({username})  ;
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists. Please choose another one.' });
        }

        const newPharm = new PharmRequest({
            username,
            name,
            email,
            password,
            dob,
            gender,
            hourlyRate, 
            affiliation , 
            educationalBackground
        });
        await newPharm.save();
        res.status(201).json(newPharm);
    } catch (error) {
        res.status(500).json({ error: 'Error sending request' });
    }
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

module.exports = { registerPPatient,registerPharmacist, loginUser };
