const Patient = require('../../models/Patient');
const Order = require('../../models/Order');
const stripe = require("stripe")("sk_test_51OA3YuHNsLfp0dKZBQsyFFPLXepbGkt9p5xZzd2Jzzj6zxLqUTY2DYF244qILCi0cfVjg37szrwdXZzin83e5ijm00X5eXuTnM");
const Medicine = require('../../models/Medicine');
const PharmacyWallet = require('../../models/PharmacyWallet');

const cancelOrder = async(req, res) =>{
    console.log("ENTERED CANCEL ORDER");
    const orderId = req.query.orderId;
    const order = await Order.findOne({_id: orderId});
    const patient = await Patient.findOne({_id: order.PatientId});
    const pharmacy = await PharmacyWallet.find();
    if(pharmacy == []){
        return res.status(500).json({message: "Pharmacy Wallet not Found"});
    }
    const pharmacyWallet = pharmacy[0];
    if(!order){
        res.status(200).json({message : "Order not found"});
    }
    if(order.status == "Ordered"){
        order.status = "Cancelled";
        await order.save();
        for(const o of patient.Orders){
            // console.log(o._id, orderId, o._id == orderId);
            if(o._id == orderId){
                o.status = "Cancelled";
                await o.save();
                break;
            }
        }
        
        let amount = 0;
        for(const m of order.items){
            const medicine = await Medicine.findOne({_id: m.MedicineId});
            medicine.availableQuantity += m.Quantity;
            amount += (m.Quantity * medicine.price);
            await medicine.save();
        }
        pharmacyWallet.Wallet -= amount;
        patient.Wallet += amount;   
        await patient.save();
        await pharmacyWallet.save();
        res.status(200).json({message : "Order has been cancelled successfully"});
    }
    else{
        res.status(200).json({message : "Order cannot be cancelled"});
    }
}

module.exports = {cancelOrder};
