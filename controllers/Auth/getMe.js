const Patient = require('../../models/Patient');

exports.getMe = async (req, res) => {
    try{
        const username = req.query.username;
        const user = await Patient.findOne({Username: username});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json(user);
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
};