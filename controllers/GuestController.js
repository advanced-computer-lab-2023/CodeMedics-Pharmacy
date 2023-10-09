const User = require('../models/pharmacyPatient');

// User Registration
const registerUser = async (req, res) => {
    try {
        console.log("hallo");
      const {
            username,
            name,
            email,
            password,
            dob,
            gender,
            mobileNumber,
            emergencyContact
        } = req.body;
        console.log(req.body)

        const user = new User({
            username,
            name,
            email,
            password,
            dob,
            gender,
            mobileNumber,
            emergencyContact
        });

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

// User Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'No user found' });
        }

        if (user.password === password) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Wrong password' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error during login' });
    }
};

module.exports = { registerUser, loginUser };
