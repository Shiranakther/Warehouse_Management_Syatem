import mongoose from 'mongoose';

let Return;

try {
  // Try to fetch the model if it already exists
  Return = mongoose.model('Return');
} catch {
  // If the model doesn't exist, define it
  const returnSchema = new mongoose.Schema({
    name: { type: String, required: true },
    itemCode: { type: String, required: true },
    quantity: { type: Number, required: true },
    companyName: { type: String, required: true },
    supplierId: { type: String, required: true },
    damageOrExpired: { type: String, required: true },
    reason: { type: String, required: true },
  }, {
    timestamps: true,
  });

  Return = mongoose.model('Returns', returnSchema);
}

export default Return;
