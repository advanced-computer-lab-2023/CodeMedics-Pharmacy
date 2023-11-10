const PharmacyPatient = require('../models/PharmacyPatient');
const Cart = require('../models/Cart');
const stripe = require("stripe")(process.env.SECRET_KEY);
const Medicine = require('../models/Medicine');

const updateMedicine = async(req, res) =>{
    const {Username, productID, quantity} = req.body;
    //console.log(req.body);
    const patient = await PharmacyPatient.findOne({Username: Username});
    if(!patient){
        throw new Error("Patient not found");
    }
    var patientCart = patient.Cart;
    if(!patientCart){
        patientCart = new Cart();
    }
    let found = false;
    for(let i = 0; i < patientCart.items.length; i++){
        if(patientCart.items[i].MedicineId == productID){
            found = true;
            patientCart.items[i].Quantity += quantity;
            break;
        }
    }
    if(!found){
        patientCart.items.push({MedicineId: productID, Quantity: quantity});
    }
    
    patient.Cart = patientCart;
    await patient.save();

}

module.exports = {updateMedicine};
