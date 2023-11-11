const Patient = require('../models/Patient');
const Order = require('../models/Order');
const { getUsername } = require('../../CodeMedics-Pharmacy/config/infoGetter');
const Medicine = require('../models/Medicine');
const updateAll = async(req, res) =>{
    const username = getUsername();
    const patient = await Patient.findOne({Username: username});
    const medicines = patient.Cart;
    for (let i = 0; i < medicines.length; i++) {
        const curMedicine = await Medicine.findOne({Name: medicines[i].Name});
        if(curMedicine.Quantity < medicines[i].Quantity){
            res.status(400).json({message: "Not enough quantity for " + medicines[i].Name});
        }
        curMedicine.Quantity -= medicines[i].Quantity;
        await curMedicine.save();
    }
    const order = new Order({
        patient: patient.FirstName + " " + patient.LastName,
        patientUsername: patient.Username,
        medicines: medicines,
        status: "Ordered"
    });

    await order.save();
    patient.Cart = [];
    patient.Orders.push(order._id);
    await patient.save();
}

module.exports = updateAll;