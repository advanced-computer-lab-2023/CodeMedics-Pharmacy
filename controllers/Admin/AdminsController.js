const adminModel = require('../../models/Administrator');
const pharmacistModel = require('../../models/Pharmacist');
const patientModel = require('../../models/Patient');
const {default: mongoose} = require('mongoose');
const medicineModel = require('../../models/Medicine');
const pharmacistRequests = require('../../models/pharmacistRequests');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (username) => {
    return jwt.sign({username}, 'supersecret', {
        expiresIn: maxAge
    });
};



const createAdmin = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({message: 'Request body is empty'});
    }
    const requiredVariables = ['Username', 'Password'];
    for (const variable of requiredVariables) {
        if (!req.body[variable] && (variable === 'Username' || variable === 'Password')) {
            return res.status(400).json({message: `Missing ${variable} in the request body`});
        }
    }
    // If all required variables are present, proceed with creating an admin
    const {Username, Password} = req.body;
    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);
    const existingAdmin = await adminModel.findOne({Username});
    if (!existingAdmin) {
        const newAdmin = new adminModel({Username, Password: hashedPassword,});
        await newAdmin.save();
        const token = createToken(Username);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        return res.status(201).json("Admin created successfully!");
    } else
        return res.status(400).json({message: "Username already exists. Please choose another one."});
};

module.exports = { createAdmin };