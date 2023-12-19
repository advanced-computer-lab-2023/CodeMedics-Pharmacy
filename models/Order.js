const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    PatientId: {
        type: String
    },
    status : {
        type: String,
        // enum: ['Ordered', 'Delivered', 'Cancelled']
    },
    amount : {
        type: Number
    },
    isWallet : {    
        type: Boolean
    },
    type: {
        type: String,
    },
    items: {
        type: [{
            MedicineId: {
                type: String
            },
            Quantity: {
                type: Number
            },
            Price: {
                type: Number
            }
        }]
    }
    , DeliveryAddress: {
        type: String
    }
}, {timestamps: true});

const Order = mongoose.model('Order', OrderSchema, 'Order');
module.exports = Order;