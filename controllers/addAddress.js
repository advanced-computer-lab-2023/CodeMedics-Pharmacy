const Patient = require('../models/Patient');
const { getUsername } = require('../../CodeMedics-Pharmacy/config/infoGetter');
const Address = require('../models/Address');
const addAddress = async(req, res) =>{
    const username = getUsername();
    const {AddressLine, City, PostalCode, PatientUsername} = req.body;
    const patient = await Patient.findOne({Username: username});
    const address = new Address({
        AddressLine: AddressLine,
        City: City,
        PostalCode: PostalCode,
        PatientUsername: PatientUsername
    });
    await address.save();
    patient.Addresses.push(address._id);
    await patient.save();
}

module.exports = addAddress;