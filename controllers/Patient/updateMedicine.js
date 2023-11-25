const PharmacyPatient = require('../../models/Patient');
const Cart = require('../../models/Cart');
const stripe = require("stripe")(process.env.SECRET_KEY);
const Medicine = require('../../models/Medicine');

const updateMedicine = async (req, res) => {
    try {
        const { Username, productID, quantity } = req.body;
        console.log("IN UPDATE MEDICINE" , Username , productID , quantity);
        const patient = await PharmacyPatient.findOne({ Username: Username });
        if (!patient) {
            throw new Error("Patient not found");
        }
        var patientCart = patient.Cart;
        if (!patientCart) {
            patientCart = new Cart();
        }
        let found = false;
        const medicine = await Medicine.findOne({ _id: productID });
        const prescriptions = patient.Prescriptions;
        const foundInPrescription = false;
        for (let i = 0; i < prescriptions.length; i++) {
            const p = prescriptions[i];
            if (p.Drug === medicine.name) {
                foundInPrescription = true;
                break;
            }
        }
        if (medicine.otc || foundInPrescription) {
            console.log('added');
            for (let i = 0; i < patientCart.items.length; i++) {
                if (patientCart.items[i].MedicineId == productID) {
                    found = true;
                    patientCart.items[i].Quantity += quantity;
                    if (patientCart.items[i].Quantity <= 0) patientCart.items.splice(i, 1);
                    break;
                }
            }
            if (!found) {
                patientCart.items.push({ MedicineId: productID, Quantity: quantity });
            }
            patient.Cart = patientCart;
            await patient.save();
        }
        return res.status(200).json({Cart: patient.Cart});
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

const getCart = async (req, res) => {
    try {
        const username = req.query.username;
        // console.log(username);
        const patient = await PharmacyPatient.findOne({Username: username});
        if(!patient.Cart) return res.status(200).json([]);
        const patientCart = patient.Cart.items;
        var medicineArray = [];
        for (let i = 0; i < patientCart.length; i++) {
            let cur = patientCart[i];
            let cnt = cur.Quantity;
            let id = cur.MedicineId;
            let med = await Medicine.findOne({ _id: id });
            let picture = med.Picture;
            let medicineName = med.name;
            let price = med.price;
            medicineArray.push({ "medicineName": medicineName, "quantity": cnt, "price": price, "medicineID": id, "picture": picture, "maxQuantity": med.availableQuantity, "Description": med.Description, "medicalUse": med.medicalUse });
        }
        return res.status(200).json(medicineArray);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }

}

module.exports = { updateMedicine, getCart };
