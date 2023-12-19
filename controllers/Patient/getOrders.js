const Patient = require('../../models/Patient');
const Address = require('../../models/Address');
const Medicine = require('../../models/Medicine');
const Order = require('../../models/Order');

const getOrders = async (req, res) => {
    try {
        const username = req.query.username;
        console.log(username);
        const patient = await Patient.findOne({ Username: username });
        if (!patient) {
            return res.status(400).json({ message: "Patient not found" });
        }
        // console.log(patient, username);
        const orders = await Order.find({ PatientId: patient._id });
        let result2 = [];
        let result = [];
        for (let i=0; i<orders.length; i++) {
            result2.push(orders[i]);
            var address = patient.Addresses.find((address) => address._id == orders[i].DeliveryAddress);
            const medicines = [];
            for (let item of orders[i].items) {
                const medicine = await Medicine.findOne({ _id: item.MedicineId });
                medicines.push({
                    "id": medicine._id,
                    "name": medicine.name,
                    "currency": "EGP",
                    "quantity": item.Quantity,
                    "unitAmount": medicine.price,
                    "billingCycle": "-",
                });
            }
            if (!address) {
                address = new Address();
            }
            result.push({
                "id": orders[i]._id,
                "createdAt": orders[i].createdAt,
                "customer": {
                    "address1": address.AddressLine,
                    "address2": address.AddressLine2,
                    "city": address.City,
                    "country": "",
                    "email": patient.Email,
                    "name": address.FirstName + ' ' + address.LastName,
                },
                "items": medicines,
                "currency": "EGP",
                "paymentMethod": orders[i].type,
                "status": orders[i].status,
                "totalAmount": orders[i].amount,
                "number": 'ORDER-' + i,
            });
        }
        res.status(200).json({ result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getOrders };