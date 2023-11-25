const Patient = require('../../models/Patient');
const Cart = require('../../models/Cart');

exports.getTotalAmount = async (req, res) => {
    try{
    const { username } = req.body;
    const cart = await Cart.findOne({ PatientId: username });
    if (!cart) {
        return res.status(400).json({ message: 'No cart found' });
    }
    const items = cart.items;
    let total = 0;
    items.forEach((item) => {
        total += item.Price * item.Quantity;
    });
    return res.status(200).json({ total });
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};