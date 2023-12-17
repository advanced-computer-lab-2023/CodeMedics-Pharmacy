const Patient = require('../../models/Patient');
const Order = require('../../models/Order');
const { getUsername } = require('../../config/infoGetter');
const Medicine = require('../../models/Medicine');
const PharmacyWallet = require('../../models/PharmacyWallet');
const Pharmacist = require('../../models/Pharmacist');

const nodemailer = require('nodemailer');

const calculateAmount = async(items) =>{
    let amount = 0;
    for (const item of items) {
        const medicine = await Medicine.findById(item.MedicineId);
        console.log(item);
        console.log(item.name, medicine);
        console.log(item.Quantity, medicine.price);
        amount += item.Quantity * medicine.price;
    }
    return amount;
}
const ifPaymentDone = async(req, res) =>{
    const {type} = req.body;
    const username =  req.query.username;
    const patient = await Patient.findOne({Username: username});
    const pharmacy = await PharmacyWallet.find();
    if(pharmacy == []){
        return res.status(500).json({message: "Pharmacy Wallet not Found"});
    }
    const pharmacyWallet = pharmacy[0];
    const medicines = patient.Cart.items;
    for (const medicine of medicines) {
        const curMedicine = await Medicine.findOne({_id: medicine.MedicineId});
        if(curMedicine.availableQuantity < medicine.Quantity){
            res.status(400).json({message: "Not enough quantity for " + medicine.name});
        }
        curMedicine.availableQuantity -= medicine.Quantity;
        if(curMedicine.availableQuantity <= 0){
            notifyAllPharmacists('Out of Stock', `Medicine ${curMedicine.name} is out of stock.`);
            messageAllPharmacists(`Medicine ${curMedicine.name} is out of stock.`);
        }
        await curMedicine.save();
    }
    let amount = await calculateAmount(medicines);
    if(type){
        patient.Wallet -= amount;
        pharmacyWallet.Wallet += amount;
    }
    const order = new Order({
        PatientId: patient._id,
        patient: patient.FirstName + " " + patient.LastName,
        items: medicines,
        amount: amount,
        status: "Ordered"
    });

    await order.save();
    patient.Cart.items = [];
    patient.Orders.push(order);
    await patient.save();
    await pharmacyWallet.save();
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'codemedics2@gmail.com',
        pass: 'wwtv oszi mcju tilf',
    },
});

async function sendEmail(recipient, subject, message) {
    try {
        const mailOptions = {
            from: 'codemedics2@gmail.com', // Replace with your Gmail email
            to: recipient,
            subject: subject,
            text: message,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
}

const notifyAllPharmacists = async (subject, text) => {
    try {
        // Fetch all pharmacists from the database
        const allPharmacists = await Pharmacist.find({}, 'Email');

        // Extract the emails from the pharmacist documents
        const pharmacistEmails = allPharmacists.map(pharmacist => pharmacist.Email);

        // Loop through the emails and send the email to each pharmacist
        for (const Email of pharmacistEmails) {
            await sendEmail(Email, subject, text);
        }
    } catch (error) {
        console.error('Error notifying pharmacists:', error);
    }
};

const messageAllPharmacists = async (text) => {
    try {
      // Fetch all pharmacists from the database
      const allPharmacists = await Pharmacist.find();
  
      // Loop through all pharmacists and append the message to their Messages list
      for (const pharmacist of allPharmacists) {
        pharmacist.Messages.push({
            sender: 'System',
            content: text,
            timestamp: new Date(),
        }); // Ensure the value is a string
        await pharmacist.save();
      }
  
      console.log(`Message "${text}" sent to all pharmacists.`);
    } catch (error) {
      console.error('Error notifying pharmacists:', error);
    }
  };

module.exports = {ifPaymentDone};