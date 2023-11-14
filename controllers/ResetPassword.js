const Patient = require('../models/Patient');
const Pharmacist = require('../models/Pharmacist');
const Admin = require('../models/Administrator');
const nodeMailer = require('nodemailer');

function generateRandomNumber() {
    const val = Math.floor(100000 + Math.random() * 999999);
    return val;
}

exports.resetPassword = async(req, res) => {
    const {username} = req.body;
    const user = await Patient.findOne({Username: username}) || await Pharmacist.findOne({Username: username}) || await  Admin.findOne({Username: username});
    if(!user) {
        return res.status(400).json({message: "User does not exist"});
    }
    let name = "";
    if(user.Name){
        name = user.Name;
    }
    else{
        name = user.FirstName + " " + user.LastName;
    }
    const emailTo = user.Email;

    const num = generateRandomNumber();
    
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: "mamghany10@gmail.com",
            pass: "dahv ghdn iiwx pdmb",
        }
    });

    const response = transporter.sendMail({
        from: "mamghany10@gmail.com",
        to: emailTo,
        subject: "CodeMedics Pharmacy, Verify your account",
        text: "Hello, " + name+ "!\n\n" + "Your OTP is: "+ num + "\n\n" +  "Best regards,\n" + "El7a2ny Pharmacy",
    }, (err, info) => {
        return info.accepted;  
      });
    res.status(200).json({message: "OTP sent successfully" , OTP: num});
};