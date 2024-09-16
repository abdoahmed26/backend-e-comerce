import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin","manager"],
        default:"user"
    },
    avatar:{
        type:String,
        default:"uploads/avatar.png"
    }
})

export const User = new mongoose.model("User",usersSchema)