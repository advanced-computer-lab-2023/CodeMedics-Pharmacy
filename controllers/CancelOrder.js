const Patient = require('../models/Patient');
const Order = require('../models/Order');
const stripe = require("stripe")("sk_test_51OA3YuHNsLfp0dKZBQsyFFPLXepbGkt9p5xZzd2Jzzj6zxLqUTY2DYF244qILCi0cfVjg37szrwdXZzin83e5ijm00X5eXuTnM");

const cancelOrder = async(req, res) =>{
    const orderId = req.query.orderId;
    const order = await Order.findById(orderId);
    const patient = await Patient.findById(order.PatientId);
    console.log("in the cancel order", orderId);
    console.log(order.PatientId);
    console.log(order);
    console.log(patient);
    if(!order){
        res.status(200).json({message : "Order not found"});
    }
    if(order.status == "Ordered"){
        order.status = "Cancelled";
        await order.save();
        for(const o of patient.Orders){
            console.log(o._id, orderId, o._id == orderId);
            if(o._id == orderId){
                o.status = "Cancelled";
                break;
            }
        }
        await patient.save();
        res.status(200).json({message : "Order has been cancelled successfully"});
    }
    else{
        res.status(200).json({message : "Order cannot be cancelled"});
    }
}

module.exports = cancelOrder;
