const Patient = require('../../models/Patient');
const { getUsername } = require('../../config/infoGetter');
const Address = require('../../models/Address');

const addAddress = async (req, res) => {
    try {
        const {username} = req.body;
        const {Name, AddressLine, City, PostalCode, PatientUsername } = req.body;
        const patient = await Patient.findOne({ Username: username });
        const address = new Address({
            Name: Name,
            AddressLine: AddressLine,
            City: City,
            PostalCode: PostalCode,
            PatientUsername: PatientUsername
        });
        if(!patient.Addresses)
            patient.Addresses = [];
        patient.Addresses.push(address);
        await patient.save();
        res.status(200).json({message: 'Address added successfully'});
    } catch (err) {
        console.log(err);
    }
}

module.exports = {addAddress};