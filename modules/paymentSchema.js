import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    paymentId:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    amount_received:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
})

export const Payment = mongoose.model("Payment",paymentSchema)