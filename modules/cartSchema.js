import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    courseId: {
        type:String,
        required:true,
    },
    courseImg: {
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description : {
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        default:1
    },
    userId:{
        type:String,
        required:true,
    }
})

export const Cart = mongoose.model("Cart",cartSchema)