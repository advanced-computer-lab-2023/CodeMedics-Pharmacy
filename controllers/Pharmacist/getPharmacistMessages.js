const jwt = require('jsonwebtoken');
const { getUsername } = require('../../config/infoGetter.js');
const pharmacistModel = require('../../models/Pharmacist.js');


exports.getPharmacistMessages = async (req, res) => {
    try {
        const pharmacistUsername = await getUsername(req, res);
        console.log('Pharmacist username:', pharmacistUsername);
        // Now you can use pharmacistUsername to retrieve messages
        const pharmacist = await pharmacistModel.findOne({ Username: pharmacistUsername });

        if (!pharmacist) {
            console.log('Pharmacist not found.');
            return res.status(404).json({ message: 'Pharmacist not  found' });
        }

        console.log('Pharmacist found:', pharmacist);

        res.status(200).json({ Messages: pharmacist.Messages });
    } catch (error) {
        console.error('Error retrieving pharmacist messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};