const adminModel = require('../../models/Administrator');
const pharmacistModel = require('../../models/Pharmacist');
const patientModel = require('../../models/Patient');
const {default: mongoose} = require('mongoose');
const medicineModel = require('../../models/Medicine');
const pharmacistRequests = require('../../models/pharmacistRequests');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const removePatient = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({message: 'Request body is empty'});
    }
    if (!req.body['Username']) {
        return res.status(400).json({message: 'Missing Username in the request body'});
    }
    const {Username} = req.body;

    try {
        const isFound = await patientModel.find({Username: Username});
        if (isFound.length == 0) {
            return res.status(400).json("Username does not exist");
        }
        await Promise.all([
            patientModel.deleteOne({Username: Username}),
        ]);
        console.log('User deleted successfully:', Username);
        return res.status(201).json(Username + "'s account has been Deleted!")
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({message: 'Error deleting user'});
    }
    return res.status(404).json("User not found in database!");
};

const viewPatients = async (req, res) => {
    try {
        const patients = await patientModel.find({}, '-Password'); // Exclude the Password field from the response

        if (!patients || patients.length === 0) {
            return res.status(404).json({message: 'No patients found.'});
        }

        return res.status(200).json({patients});
    } catch (error) {
        return res.status(500).json({error: 'Failed to fetch pharmacists.'});
    }
};

module.exports = { removePatient, viewPatients };