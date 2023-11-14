const Patient = require('../models/Patient');
const { getUsername } = require('.././config/infoGetter');
const Cart = require('../models/Cart');
const checkValidity = async(req, res) =>{
    console.log("we are in the checkValidity");
    const username = getUsername();
    const patient = await Patient.findOne({Username: username});
    const cart = patient.Cart;
    let ret = true;
    for (let i = 0; i < cart.length; i++) {
        const curMedicine = await Cart.findOne({Name: cart[i].Name});
        if(curMedicine.Quantity < cart[i].Quantity){
            cart[i].Quantity = curMedicine.Quantity;
            res.status(400).json({message: "Quantity of " + cart[i].Name + " is not available"});
        }
    }
    await patient.save();
    res.status(200).json({message: "Valid"});
}

module.exports = checkValidity;