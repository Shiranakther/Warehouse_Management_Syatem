// returnModel.js

import mongoose from 'mongoose';

const returnSchema = new mongoose.Schema({
    name: { type: String, required: true },
    itemCode: { type: String, required: true },
    quantity: { type: Number, required: true },
    companyName: { type: String, required: true },
    supplierId: { type: String, required: true },
    damageOrExpired: { type: String, required: true },
    reason: { type: String, required: true },
},
{
    timestamps: true,
}
);

const Return = mongoose.model('Return', returnSchema);

export default Return;
