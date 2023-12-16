const Patient = require('../../models/Patient');
const Order = require('../../models/Order');
const { getUsername } = require('../../config/infoGetter');
const Medicine = require('../../models/Medicine');
const PharmacyWallet = require('../../models/PharmacyWallet');

const calculateAmount = async(items) =>{
    let amount = 0;
    for (const item of items) {
        const medicine = await Medicine.findById(item.MedicineId);
        console.log(item);
        console.log(item.name, medicine);
        console.log(item.Quantity, medicine.price);
        amount += item.Quantity * medicine.price;
    }
    return amount;
}
const ifPaymentDone = async(req, res) =>{
    const {type} = req.body;
    const username =  req.query.username;
    const patient = await Patient.findOne({Username: username});
    const pharmacy = await PharmacyWallet.find();
    if(pharmacy == []){
        return res.status(500).json({message: "Pharmacy Wallet not Found"});
    }
    const pharmacyWallet = pharmacy[0];
    const medicines = patient.Cart.items;
    for (const medicine of medicines) {
        const curMedicine = await Medicine.findOne({_id: medicine.MedicineId});
        if(curMedicine.availableQuantity < medicine.Quantity){
            res.status(400).json({message: "Not enough quantity for " + medicine.name});
        }
        curMedicine.availableQuantity -= medicine.Quantity;
        await curMedicine.save();
    }
    let amount = await calculateAmount(medicines);
    if(type){
        patient.Wallet -= amount;
        pharmacyWallet.Wallet += amount;
    }
    const order = new Order({
        PatientId: patient._id,
        patient: patient.FirstName + " " + patient.LastName,
        items: medicines,
        amount: amount,
        status: "Ordered"
    });

    await order.save();
    patient.Cart.items = [];
    patient.Orders.push(order);
    await patient.save();
    await pharmacyWallet.save();
}

module.exports = {ifPaymentDone};