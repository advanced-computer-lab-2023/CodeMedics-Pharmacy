const Orders = require('../../models/Order');

const getOrders = async (req, res) => {
    try {
        const orders = await Orders.find().sort({createdAt: 1});
        const result = [];
        for(let i=0; i<orders.length; i++){
          result.push({
            "id": orders[i]._id,
            "createdAt": orders[i].createdAt,
            "customer": {
              "address1": "Cairo",
              "city": "Cairo",
              "country": "Egypt",
              "name": "Mohamed Ahmed"
            },
            "currency": "EGP",
            "paymentMethod": 'CreditCard',
            "status": orders[i].status,
            "totalAmount": orders[i].amount,
            "number": 'ORDER-'+i,
          });
        }
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
module.exports = {getOrders};