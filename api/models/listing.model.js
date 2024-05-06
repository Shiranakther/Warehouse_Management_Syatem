import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    
    supplierName: {
      type: String,
      required: true,

    },
    itemCode: {
      type: String,
      required: true,
      unique: true,
    },
    itemName: {
      type: String,
      required: true,
      unique: true,
    },
    orderQuentity: {
      type: Number,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('PurchaseOrder', listingSchema);

export default Listing;
