const Patient = require('../models/Patient');
const { getUsername } = require('../../CodeMedics-Pharmacy/config/infoGetter');
const Cart = require('../models/Cart');
const checkValidity = async(req, res) =>{
    const username = getUsername();
    const patient = await Patient.findOne({Username: username});
    const cart = patient.Cart;
    Boolean ret = true;
    for (let i = 0; i < cart.length; i++) {
        const curMedicine = await Cart.findOne({Name: cart[i].Name});
        if(curMedicine.Quantity < cart[i].Quantity){
            cart[i].Quantity = curMedicine.Quantity;
            ret = false;
        }
    }
    await patient.save();
    return ret;
}

module.exports = checkValidity;