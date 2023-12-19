const Orders = require('../../models/Order');
const Address = require('../../models/Address');
const Patient = require('../../models/Patient');
const Medicine = require('../../models/Medicine');

exports.completeOrder = async (req, res) => {
    try{
        const { orderId } = req.body;
        const order = await Orders.findById(orderId);
        if(!order) return res.status(404).json({ message: 'Order not found' });
        order.status = 'completed';
        await order.save();
        return res.json({ message: 'Order completed successfully' });
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
};