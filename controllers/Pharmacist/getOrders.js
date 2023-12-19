const Orders = require('../../models/Order');
const Address = require('../../models/Address');
const Patient = require('../../models/Patient');
const Medicine = require('../../models/Medicine');

const getOrders = async (req, res) => {
  try {
    const orders = await Orders.find().sort({ createdAt: 1 });
    const result = [];
    for (let i = 0; i < orders.length; i++) {
      const patient = await Patient.findOne({ _id: orders[i].PatientId });
      if (!patient) continue;
      var address = patient.Addresses.find((address) => address._id == orders[i].DeliveryAddress);
      const medicines = [];
      for(let item of orders[i].items){
        const medicine = await Medicine.findOne({_id: item.MedicineId});
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
        "number": 'ORDER-'+i,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = { getOrders };