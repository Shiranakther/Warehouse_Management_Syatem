import mongoose from 'mongoose';

const { Schema } = mongoose;

const approvePOSchema = new Schema({
  supplierName: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  itemCode: {
    type: String,
    required: true,
  },
  orderQuentity: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ApprovePO = mongoose.model('ApprovePO', approvePOSchema);

export default ApprovePO;
