import { User } from "../modules/usersSchema.js"
import crypto from "crypto"
import bcrypt from "bcryptjs"

export const authLoginSuccess = async(req,res)=>{
    const user = req.user
    const oldUser = await User.findOne({email:user.email})
    if(oldUser){
        return res.status(200).json({status:"success",data:{user:oldUser}})
    }
    const pass = crypto.randomBytes(3).toString("hex")
    const hashPassword = await bcrypt.hash(pass,10)
    const newUser = new User({
        username:user.displayName,
        email:user.email,
        password:hashPassword,
        avatar:user.picture
    })
    newUser.save().then((user)=>{
        return res.status(201).json({status:"success",data:{user}})
    }).catch((error)=>{
        return res.status(404).json({status:"error",message:error.message})
    })
}