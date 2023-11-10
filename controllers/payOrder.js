const PharmacyPatient = require('../../CodeMedics-Pharmacy/models/PharmacyPatient');
const Order = require('../../CodeMedics-Pharmacy/models/Order');
const stripe = require("stripe")(process.env.SECRET_KEY);

const payOrder = async(req, res) =>{
    const {patientId, total, deliveryAddress, paymentMethod, items} = req.body;
    
    const patient = await PharmacyPatient.findById(patientId);
    if(!patient){
        res.status.json({message : "Patient not found"});
    }
    if(paymentMethod == "CashOnDelivery"){
        res.status.json({message : "Order has been placed successfully"});
        res.redirect(300, "http://localhost:"+process.env.PORT);
        const curOrder = {PatientId: patientId, status: "Ordered", amount: total, isWallet: false, DeliveryAddress: deliveryAddress, items: items};
        const order = await Order.create(curOrder);
        await order.save();
    }
    else if(paymentMethod == "Card"){
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'usd',
            payment_method_types: ['card'],
            automatic_payment_methods: {
                enabled: true
            }
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
            });    
        res.redirect(300, "http://localhost:"+process.env.PORT);
    }
    else if(paymentMethod == "Wallet"){
        if(patient.Wallet < total){
            res.status.json({message : "Insufficient funds"});
        }
        else{
            patient.Wallet -= total;
            await patient.save();
            const curOrder = {PatientId: patientId, status: "Ordered", amount: total, isWallet: false, DeliveryAddress: deliveryAddress, items: items};
            const order = await Order.create(curOrder);
            await order.save();
            res.status.json({message : "Order has been placed successfully"});
            res.redirect(300, "http://localhost:"+process.env.PORT);
        }
    }
    else{
        res.status.json({message : "Invalid payment method"});
    }
}

module.exports = {payOrder};
