const Doctor = require('../../CodeMedics-Clinic/models/Doctor');
const Patient = require('../../CodeMedics-Clinic/models/Patient');
const stripe = require("stripe")(process.env.SECRET_KEY);


const payOrder = async(req, res) =>{
    const {patientId, total, paymentMethod} = req.body;
    
    const patient = await Patient.findById(patientId);
    if(!patient){
        res.status.json({message : "Patient not found"});
    }
    if(paymentMethod == "CashOnDelivery"){
        res.status.json({message : "Order has been placed successfully"});
        res.redirect(300, "http://localhost:"+process.env.PORT);
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
    }
    else if(paymentMethod == "Wallet"){
        if(patient.Wallet < total){
            res.status.json({message : "Insufficient funds"});
        }
        else{
            patient.Wallet -= total;
            await patient.save();
            res.status.json({message : "Order has been placed successfully"});
            res.redirect(300, "http://localhost:"+process.env.PORT);
        }
    }
    else{
        res.status.json({message : "Invalid payment method"});
    }
}

module.exports = {payOrder};
