const Patient = require('../models/Patient');
const Cart = require('../models/Cart');
const stripe = require("stripe")(process.env.SECRET_KEY);

const updateMedicine = async(req, res) =>{
    const {patientId, medicineId, quantity} = req.body;

    const patient = await Patient.findById(patientId);
    if(!patient){
        throw new Error("Patient not found");
    }
    const patientCart = patient.Cart;
    let found = false;
    for(let i = 0; i < patientCart.length; i++){
        if(patientCart[i].medicineId == medicineId){
            found = true;
            patientCart[i].quantity += quantity;
            break;
        }
    }
    if(!found){
        patientCart.push({medicineId: medicineId, quantity: quantity});
    }
    patient.Cart = patientCart;
    await patient.save();
}

module.exports = {updateMedicine};
