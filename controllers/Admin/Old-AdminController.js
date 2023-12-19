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
                const pharmacist = await pharmacistModel.findOne({Username: username});
                if (pharmacist) {
                    res.status(200).json({message: 'You are authorized'});
                } else {
                    res.status(400).json({message: 'You are not authorized'});
                }
            } else if (type === 'patient') {
                const patient = await patientModel.findOne({Username: username});
                if (patient) {
                    res.status(200).json({message: 'You are authorized'});
                } else {
                    res.status(400).json({message: 'You are not authorized'});
                }
            }
        }
    });
};

const createAdmin = async (req, res) => {
    //create an admin in the database
    //check req body
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

const removePharmacist = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({message: 'Request body is empty'});
    }
    if (!req.body['Username'] || req.body['Username'] === '') {
        return res.status(400).json({message: 'Missing Username in the request body'});
    }
    const {Username} = req.body;
    try {
        const isFound = await pharmacistModel.find({Username: Username});
        if (isFound.length == 0) {
            return res.status(400).json({message: "Username does not exist"});
        }

        await Promise.all([
            pharmacistModel.deleteOne({Username: Username})
        ]);
        console.log('User deleted successfully:', Username);
        return res.status(201).json(Username + "'s account has been Deleted!")
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({message: 'Error deleting user'});
    }
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
        const isFound = await patientModel.find({Username: Username});
        if (isFound.length == 0) {
            return res.status(400).json({message: "Username does not exist"});
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


const viewPharmacists = async (req, res) => {
    try {
        const pharmacists = await pharmacistModel.find({}, '-Password'); // Exclude the Password field from the response

        if (!pharmacists || pharmacists.length === 0) {
            return res.status(404).json({message: 'No pharmacists found.'});
        }

        return res.status(200).json({pharmacists});
    } catch (error) {
        return res.status(500).json({message: 'Failed to fetch pharmacists.'});
    }
};

const viewPharmacistApplications = async (req, res) => {
    try {
        const pharmacistApplications = await pharmacistModel.find({Status: 'Pending'});

        if (!pharmacistApplications || pharmacistApplications.length == 0) {
            return res.status(404).json({message: 'No pharmacist applications found.'});
        }
        return res.status(200).json({pharmacistApplications});
    } catch (error) {
        return res.status(500).json({message: 'Failed to fetch pharmacist applications.'});
    }
};

const viewPatients = async (req, res) => {
    try {
        const patients = await patientModel.find({}, '-Password'); // Exclude the Password field from the response

        if (!patients || patients.length === 0) {
            return res.status(404).json({message: 'No patients found.'});
        }

        return res.status(200).json({patients});
    } catch (error) {
        return res.status(500).json({message: 'Failed to fetch pharmacists.'});
    }
};
const acceptPharmacist = async (req, res) => {
    const {Username, Email} = req.body;
    const Pharmacist = await pharmacistModel.findOne({Username: Username, Email: Email});
    if (!Pharmacist) {
        return res.status(400).json({message: 'Pharmacist not found'});
    }
    await Pharmacist.updateOne({Status: 'Approved'});
    await Pharmacist.save();
    return res.status(200).json({message: 'Pharmacist approved successfully'});
};

const rejectPharmacist = async (req, res) => {
    const {Username, Email} = req.body;
    const Pharmacist = await pharmacistModel.findOne({Username: Username, Email: Email});
    if (!Pharmacist) {
        return res.status(400).json({message: 'Pharmacist not found'});
    }
    await Pharmacist.updateOne({Status: 'Rejected'});
    await Pharmacist.save();
    return res.status(200).json({message: 'Pharmacist Rejected successfully'});
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


module.exports = {
    createAdmin,
    removePatient,
    removePharmacist,
    viewPharmacists,
    viewPharmacistApplications,
    viewPatients,
    auth,
    acceptPharmacist,
    rejectPharmacist
};