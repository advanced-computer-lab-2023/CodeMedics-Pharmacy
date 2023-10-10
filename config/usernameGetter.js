const adminModel = require("../models/Administrator");
const Pharmacist = require("../models/Pharmacist");
const patientModel = require("../models/pharmacyPatient");
const Administrator = require("../models/Administrator");


const get = async (req, res) => {
    const {Username} = req.body;

    try {
        const usernameExists = await adminModel.findOne({Username}) || await doctorModel.findOne({Username}) || await patientModel.findOne({Username}) 
        || await pharmacyPatient.findOne({Username}) || await Pharmacist.findOne({Username}) || await Administrator.findOne({Username})  ;
        if (usernameExists) {
            return usernameExists.Username;
        }
        return '';
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};
module.exports = {get};
