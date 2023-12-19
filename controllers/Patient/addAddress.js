const Patient = require('../../models/Patient');
const { getUsername } = require('../../config/infoGetter');
const Address = require('../../models/Address');

const addAddress = async (req, res) => {
    try {
        const username = await getUsername(req , res);
        const {FirstName,LastName,  AddressLine,AddressLine2, City, PostalCode} = req.body;
        const patient = await Patient.findOne({ Username: username });
        const address = new Address({
            FirstName: FirstName,
            LastName: LastName,
            AddressLine: AddressLine,
            AddressLine2: AddressLine2,
            City: City,
            PostalCode: PostalCode,
            PatientUsername: username
        });
        if(!patient.Addresses)
            patient.Addresses = [];
        patient.Addresses.push(address);
        await patient.save();
        res.status(200).json({message: 'Address added successfully' , address: address
    });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {addAddress};