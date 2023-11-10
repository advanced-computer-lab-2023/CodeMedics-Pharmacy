const PharmacyPatient = require('../models/Patient');
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

const getCart = async(req, res) => {
    try{
        const username = req.query.username;
        console.log(username);
        const patient = await PharmacyPatient.findOne({Username: username});
        const patientCart = patient.Cart.items;
        var medicineArray = [];
        for(let i = 0; i<patientCart.length; i++){
            let cur = patientCart[i];
            let cnt = cur.Quantity;
            let id = cur.MedicineId;
            let picture = cur.picture;
            let med = await Medicine.findOne({_id: id});
            let medicineName = med.name;
            let price = med.price;
            medicineArray.push({"medicineName": medicineName, "quantity": cnt, "price": price, "medicineID": id, "picture": picture});
        }
        console.log(medicineArray);
        return res.status(200).json(medicineArray);
    }catch(err){
        return res.status(400).json(err);
    }
    
}

module.exports = {updateMedicine, getCart};
