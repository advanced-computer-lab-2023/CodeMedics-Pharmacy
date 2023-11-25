const Patient = require('../../models/Patient');
const { getUsername } = require('../../config/infoGetter');
const Medicine = require('../../models/Medicine');

const checkValidity = async (req, res) => {
    try {
        const username = req.query.username;
        const patient = await Patient.findOne({ Username: username });
        const cart = patient.Cart.items;
        for (let i = 0; i < cart.length; i++) {
            const curMedicine = await Medicine.findOne({ Name: cart[i].Name });
            console.log(cart[i], curMedicine.availableQuantity, " ", cart[i].Quantity);
            if (curMedicine.availableQuantity < cart[i].Quantity) {
                cart[i].Quantity = curMedicine.availableQuantity;
                await patient.save();
                res.status(401).json({ message: "the available quantity of " + curMedicine.name + " is " + curMedicine.availableQuantity });
                return;
            }
        }
        res.status(200).json({ message: "Valid" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = checkValidity;