const adminModel = require('../models/Administrator');
const pharmacistModel = require('../models/Pharmacist');
const patientModel = require('../models/pharmacyPatient');
const {default: mongoose} = require('mongoose');
const getUsername = require('../config/usernameGetter');
const medicineModel = require('../models/Medicine');
const pharmacistRequests = require('../models/pharmacistRequests');


const createAdmin = async (req, res) => {
    const { Username, Password } = req.body;
    const existingUser = await adminModel.findOne({ Username }) || await pharmacistModel.findOne({ Username }) || await patientModel.findOne({ Username });

    if (existingUser) {
        return res.status(400).json({ error: 'Username already exists. Please choose another one.' });
    }

    try {
        const newAdmin = new adminModel({ Username, Password });
        await newAdmin.save();
        return res.status(200).json(newAdmin);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create a new admin.' });
    }
};

const removePharmacist = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({message: 'Request body is empty'});
    }
    if (!req.body['Username']) {
        return res.status(400).json({message: 'Missing Username in the request body'});
    }
    const {Username} = req.body;
        try {
            await Promise.all([
                pharmacistModel.deleteOne({Username: Username})
            ]);
            console.log('User deleted successfully:', Username);
            return res.status(201).json(Username + "'s account has been Deleted!")
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({message: 'Error deleting user'});
        }
        return res.status(404).json("User not found in database!");
};

const removePatient = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({message: 'Request body is empty'});
    }
    if (!req.body['Username']) {
        return res.status(400).json({message: 'Missing Username in the request body'});
    }
    const {Username} = req.body;
        try {
            await Promise.all([
                patientModel.deleteOne({username: Username}),
            ]);
            console.log('User deleted successfully:', Username);
            return res.status(201).json(Username + "'s account has been Deleted!")
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({message: 'Error deleting user'});
        }
        return res.status(404).json("User not found in database!");
};


const viewPharmacists = async (req, res) => {
    try {
        const pharmacists = await pharmacistModel.find({}, '-Password'); // Exclude the Password field from the response

        if (!pharmacists || pharmacists.length === 0) {
            return res.status(404).json({ message: 'No pharmacists found.' });
        }

        return res.status(200).json({ pharmacists });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch pharmacists.' });
    }
};

const viewPharmacistApplications = async (req, res) => {
    try {
        const pharmacistApplications = await pharmacistRequests.find();
        console.log('Pharmacist Applications:', pharmacistApplications);

        if (!pharmacistApplications || pharmacistApplications.length == 0) {
            return res.status(404).json({ message: 'No pharmacist applications found.' });
        }
        console.log(pharmacistApplications);
        return res.status(200).json({ pharmacistApplications });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch pharmacist applications.' });
    }
};

const viewPatients = async (req, res) => {
    try {
        const patients = await patientModel.find({}, '-Password'); // Exclude the Password field from the response

        if (!patients || patients.length === 0) {
            return res.status(404).json({ message: 'No patients found.' });
        }

        return res.status(200).json({ patients });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch pharmacists.' });
    }
};

// const searchMedicine = async (req, res) => {

//     const searchQuery = req.body.name
//     try {
//         const medicines = await medicineModel.find({
//             name: { $regex: new RegExp(`^${searchQuery}`, 'i') }, 
         
//         });

//         if (medicines.length === 0) {
//             return res.status(404).json({ message: 'No medicines found with the provided name.' });
//         }

//         return res.status(200).json(medicines);
//     } catch (error) {
//         console.error('Error searching for medicines:', error);
//         return res.status(500).json({ error: 'Failed to search for medicines.' });
//     }
// };

// const getMedicalUses = async (req, res) => {
//     try {
//         const uniqueMedicalUses = await medicineModel.distinct('medicalUse');

//         if (uniqueMedicalUses.length === 0) {
//             return res.status(404).json({ message: 'No unique medical uses found.' });
//         }

//         return res.status(200).json({ medicalUses: uniqueMedicalUses });
//     } catch (error) {
//         console.error('Error retrieving medical uses:', error);
//         return res.status(500).json({ error: 'Failed to retrieve medical uses.' });
//     }

// };

// const getMedicinesByMedicalUse = async (req, res) => {
//     const { medicalUse } = req.body;

//     try {
//         const medicines = await medicineModel.find({ medicalUse });

//         if (medicines.length === 0) {
//             return res.status(404).json({ message: 'No medicines found with the specified medical use.' });
//         }

//         return res.status(200).json(medicines);
//     } catch (error) {
//         console.error('Error retrieving medicines by medical use:', error);
//         return res.status(500).json({ error: 'Failed to retrieve medicines by medical use.' });
//     }
// };
// const viewMedicines = async (req, res) => {
    //     try {
    //         const medicines = await medicineModel.find();
    
    //         if (!medicines || medicines.length === 0) {
    //             return res.status(404).json({ message: 'No medicines found.' });
    //         }
           
    //         return res.status(200).json({ medicines });
    //     } catch (error) {
    //         return res.status(500).json({ error: 'Failed to fetch pharmacists.' });
    //     }
    // };
    

module.exports = {createAdmin, removePatient, removePharmacist, viewPharmacists, viewPharmacistApplications, viewPatients};