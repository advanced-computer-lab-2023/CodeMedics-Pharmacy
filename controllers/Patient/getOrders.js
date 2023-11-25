const Patient = require('../../models/Patient');
const getOrders = async (req, res) => {
    try {
        const username = req.query.username;
        console.log(username);
        const patient = await Patient.findOne({ Username: username });
        if(!patient){
            return res.status(400).json({message: "Patient not found"});
        }
        // console.log(patient, username);
        const orders = patient.Orders;
        let result = [];
        for (const order of orders) {
            result.push(order);
        }
        // console.log(result);
        res.status(200).json({ orders: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

module.exports = {getOrders};