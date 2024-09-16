import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema({
    courseImg: {
        type:String,
        default:"uploads/reactjs.png"
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
    }
})

export const Course = mongoose.model("Course", coursesSchema);