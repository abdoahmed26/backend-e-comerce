import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
    review:{
        type:String,
        required:true
    },
    rate:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    userImg:{
        type:String,
        required:true
    },
    courseId:{
        type:String,
        required:true
    }
})

export const Review = mongoose.model("Review",reviewsSchema)