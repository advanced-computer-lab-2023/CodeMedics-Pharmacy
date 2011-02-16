const Patient = require('../../models/Patient');

exports.getAddress = async (req, res) => {
    try {
        const username = req.query.username;
        const user = await Patient.findOne({ Username: username });
        if (!user) {
            res.status(404).send({message: 'user not found'});
        }
        else {
            res.status(200).json(user.Addresses);
        }
    }
    catch (error) {
        res.status(500).send({message: error.message});
    }
}