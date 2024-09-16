import mongoose from "mongoose";

const forgotPasswordSchema = new mongoose.Schema({
    code : {
        type:String,
        required:true
    },
    codeExpired:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

export const Code = mongoose.model("Code",forgotPasswordSchema)