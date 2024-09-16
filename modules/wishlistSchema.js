import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
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
    userId:{
        type:String,
        required:true,
    }
})

export const Wishlist = mongoose.model("Wishlist", wishlistSchema)