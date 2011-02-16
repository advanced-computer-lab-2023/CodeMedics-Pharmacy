const patientModel = require('../../models/Patient');
const adminModel = require('../../models/Administrator');
const pharmacistModel = require('../../models/Pharmacist');
const bcrypt = require('bcryptjs');



exports.changePassword = async (req, res) => {
    const {username, currentPassword, newPassword } = req.body;
    console.log(username , currentPassword, newPassword);
    try {
        const user = await patientModel.findOne({ Username: username }) || await pharmacistModel.findOne({Username: username}) || await adminModel.findOne({Username: username});
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // // Verify if the current password matches the one in the database
        // const passwordMatch = await bcrypt.compare(currentPassword, patient.Password);

        // if (!passwordMatch) {
        //     return res.status(400).json({ error: 'Current password is incorrect' });
        // }
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        console.log("here ----> 1");
        // Update the doctor's password in the database
        user.Password = hashedPassword;
        await user.save();
        
        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
