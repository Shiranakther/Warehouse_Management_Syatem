import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    vehicleNumber: {
        type: String,
        required: true
    },
    ownerName:{
        type:String,
        required:true
    },
    manufacturedYear:{
        type:Number,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    mileage:{
        type:Number,
        required:true
    },
    
},{timestamps:true})

const vehicleModel = mongoose.model('vehicles', vehicleSchema);
export default vehicleModel;
