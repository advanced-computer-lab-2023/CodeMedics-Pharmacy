const Patient = require('../models/Patient');
const Order = require('../models/Order');
const stripe = require("stripe")(process.env.SECRET_KEY);

const CancelOrder = async(req, res) =>{
    const {orderId} = req.body;
    const order = await Order.findById(orderId);
    if(!order){
        res.status.json({message : "Order not found"});
    }
    if(order.status == "Ordered"){
        order.status = "Cancelled";
        await order.save();
        res.status.json({message : "Order has been cancelled successfully"});
    }
    else{
        res.status.json({message : "Order cannot be cancelled"});
    }
}

module.exports = {CancelOrder};
