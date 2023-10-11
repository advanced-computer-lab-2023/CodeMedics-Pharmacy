const adminModel = require('../models/Administrator.js');

const patientModel = require('../models/pharmacyPatient.js');
const {default: mongoose} = require('mongoose');
const getUsername = require('../config/usernameGetter');
const medicineModel = require('../models/Medicine.js');
const pharmacistModel= require('../models/Pharmacist');
const PharmRequest = require("../models/pharmacistRequests");


const Pharmacist = async (req, res) => {
    try {
        console.log("hello");
        const {
            Name,
            Username,
            Password,
            Email,
            DateOfBirth,
            HourlyRate,
            affiliation,
            Degree
        } = req.body;
        console.log(req.body)
        
    const existingUser = await patientModel.findOne({username :Username }) || await pharmacistModel.findOne({Username: Username}) || await adminModel.findOne({Username: Username}) || await PharmRequest.findOne({username: Username}) ;
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists. Please choose another one.' });
        }
    const existingUser2 = await patientModel.findOne({email:Email}) || await pharmacistModel.findOne({Email:Email}) || await adminModel.findOne({Email:Email}) || await PharmRequest.findOne({email:Email})  ;
        if (existingUser2) {
            return res.status(400).json({ error: 'email already exists. Please choose another one.' });
        }
        const newPharm = new pharmacistModel({
            Name,
            Username,
            Password,
            Email,
            DateOfBirth,
            HourlyRate,
            affiliation,
            Degree
        });
        await newPharm.save();
        res.status(201).json(newPharm);
    } catch (error) {
        res.status(500).json({ error: 'Error sending ' });
    }
};

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


module.exports = {viewList,Pharmacist};