import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema({
    shippingId: {
        type: String,
        required: true,
    },
    orderId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Order', // Referencing the Order model
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userMobile: {
        type: String,
        required: true
    },
    userAddress: {
        type: String,
        required: true
    },
    vehicle:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'vehicles',
        default: null
    },
    status:{
        type:String,
        required:true,
        default: 'In Progress'
    }
    
},{timestamps:true});

const shippingModel = mongoose.model('shippings', shippingSchema);
export default shippingModel;
