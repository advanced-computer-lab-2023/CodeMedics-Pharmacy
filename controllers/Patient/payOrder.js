const PharmacyPatient = require('../../models/Patient');
const Order = require('../../models/Order');
const stripe = require("stripe")(process.env.SECRET_KEY);
const PharmacyWallet = require('../../models/PharmacyWallet');

const payOrder = async(req, res) =>{
    const {patientId, total, deliveryAddress, paymentMethod, items} = req.body;
    
    const patient = await PharmacyPatient.findById(patientId);
    const pharmacy = await PharmacyWallet.find();
    console.log("HERE IN PAYORDER NOW");
    if(pharmacy == []){
        return res.status(500).json({message: "Pharmacy Wallet not Found"});
    }
    const pharmacyWallet = pharmacy[0];
    if(!patient){
        res.status(404).json({message : "Patient not found"});
    }
    if(paymentMethod == "CashOnDelivery"){
        res.status(201).json({message : "Order has been placed successfully"});
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
        var discount = 0;
            if (package) {
                discount = package.MedicineDiscount / 100;
            }
        total = total - total * discount;
        if(patient.Wallet < total){
            res.status(400).json({message : "Insufficient funds"});
        }
        else{
            total = Math.max(total, 0);
            patient.Wallet -= total;
            pharmacyWallet.Wallet += total;
            await PharmacyWallet.save();
            await patient.save();
            const curOrder = {PatientId: patientId, status: "Ordered", amount: total, isWallet: false, DeliveryAddress: deliveryAddress, items: items};
            const order = await Order.create(curOrder);
            await order.save();
            res.status.json({message : "Order has been placed successfully"});
            res.redirect(300, "http://localhost:"+process.env.PORT);
        }
    }
    else{
        res.status(400).json({message : "Invalid payment method"});
    }
}

module.exports = {payOrder};
