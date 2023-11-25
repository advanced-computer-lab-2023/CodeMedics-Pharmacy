
const pharmacistModel = require('../../models/Pharmacist');


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
            return res.status(400).json("Username does not exist");
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

const viewPharmacists = async (req, res) => {
    try {
        const pharmacists = await pharmacistModel.find({}, '-Password'); // Exclude the Password field from the response

        if (!pharmacists || pharmacists.length === 0) {
            return res.status(404).json({message: 'No pharmacists found.'});
        }

        return res.status(200).json({pharmacists});
    } catch (error) {
        return res.status(500).json({error: 'Failed to fetch pharmacists.'});
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
        return res.status(500).json({error: 'Failed to fetch pharmacist applications.'});
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

module.exports = { removePharmacist, viewPharmacists, viewPharmacistApplications, acceptPharmacist, rejectPharmacist };