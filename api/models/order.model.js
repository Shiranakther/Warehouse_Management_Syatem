// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//     Outlet: { type: String, required: true },
//     OrderID: { type: String, required: true },
//     ItemCode: { type: Number, required: true },
//     Quantity: { type: String, required: true },   
//     Status: { type: String, required: true , default: 'Pending' },
// },
// {
//     timestamps: true,
// }
// );

// const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    Outlet: { type: String, required: true },
    OrderID: { type: String, required: true },
    ItemCode: { type: Number, required: true },
    Quantity: { type: String, required: true },   
    Status: { type: String, required: true , default: 'Pending' },
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
