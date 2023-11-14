const Patient = require('../models/Patient');
exports.getAdress = async (req, res) => {
    try {
        const username = req.query.username;
        const user = await Patient.findOne({ Username: username });
        if (!user) {
            res.status(404).send('user not found');
        }
        else {
            res.status(200).json(user.Addresses);
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}