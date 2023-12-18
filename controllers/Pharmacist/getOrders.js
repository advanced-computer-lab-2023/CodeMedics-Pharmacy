const Orders = require('../../models/Order');

const getOrders = async (req, res) => {
    try {
        const orders = await Orders.find();
        res.json(orders);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
module.exports = {getOrders};