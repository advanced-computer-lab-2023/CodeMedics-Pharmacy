const Patient = require('../models/Patient');
const getOrders = async(req, res) =>{
    const username = req.query.username;
    const patient = await Patient.findOne({Username: username});
    console.log(patient, username);
    const orders = patient.Orders;
    let result = [];
    for (const order of orders) {
        result.push(order);
    }
    console.log(result);
    res.status(200).json({orders: result});
}

module.exports = getOrders;