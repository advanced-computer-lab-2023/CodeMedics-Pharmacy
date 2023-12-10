const Administrator = require("../../models/Administrator");
const PharmRequest = require("../../models/Pharmacist");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const PatientModel = require('../../models/Patient');

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (username) => {
    return jwt.sign({username}, 'supersecret', {
        expiresIn: maxAge
    });
};

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
            patient = await PatientModel.findOne({Username: username});
            pharmacist = await PharmRequest.findOne({Username: username});
            admin = await Administrator.findOne({Username: username});
        }
        if (email) {
            patient = await PatientModel.findOne({email});
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

const auth = async (req, res) => {
    const {token, type} = req.body;
    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
        if (err) {
            res.status(500).json({message: err.message});
        } else {
            const username = decodedToken.username;
            if (decodedToken.expiresIn < 1) {
                res.status(401).json({message: 'Token has expired'});
            }
            if (type === 'admin') {
                const admin = await adminModel.findOne({Username: username});
                if (admin) {
                    res.status(200).json({message: 'You are authorized'});
                } else {
                    res.status(400).json({message: 'You are not authorized'});
                }
            } else if (type === 'pharmacist') {
                const pharmacist = await PharmRequest.findOne({Username: username});
                if (pharmacist) {
                    res.status(200).json({message: 'You are authorized'});
                } else {
                    res.status(400).json({message: 'You are not authorized'});
                }
            } else if (type === 'patient') {
                const patient = await PatientModel.findOne({Username: username});
                if (patient) {
                    res.status(200).json({message: 'You are authorized'});
                } else {
                    res.status(400).json({message: 'You are not authorized'});
                }
            }
        }
    });
};

module.exports = {
    loginUser,
    logout,
    auth
};
