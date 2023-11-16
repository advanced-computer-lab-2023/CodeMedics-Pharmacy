const Patient = require('../models/Patient');
const Order = require('../models/Order');
const { getUsername } = require('.././config/infoGetter');
const Medicine = require('../models/Medicine');
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
    console.log("in the payment done")
    const username =  req.query.username;
    console.log(username);
    const patient = await Patient.findOne({Username: username});
    const medicines = patient.Cart.items;
    for (const medicine of medicines) {
        const curMedicine = await Medicine.findOne({_id: medicine.MedicineId});
        if(curMedicine.availableQuantity < medicine.Quantity){
            res.status(400).json({message: "Not enough quantity for " + medicine.name});
        }
        curMedicine.availableQuantity -= medicine.Quantity;
        await curMedicine.save();
    }
    console.log("order added");
    console.log(medicines);
    let amount = await calculateAmount(medicines);
    console.log(amount);
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
}

module.exports = ifPaymentDone;