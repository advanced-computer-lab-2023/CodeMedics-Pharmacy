const Patient = require('../models/Patient');
const { getUsername } = require('../../CodeMedics-Pharmacy/config/infoGetter');
const getOrders = async(req, res) =>{
    const username = getUsername();
    const patient = await Patient.findOne({Username: username});
    const orders = patient.Orders;
    res.status(200).json({orders});
}

module.exports = getOrders;