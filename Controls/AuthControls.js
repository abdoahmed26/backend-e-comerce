import { User } from "../modules/usersSchema.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const login = async(req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email: email})

    if(!user){
        return res.status(400).json({status:"fail",data:{user:"user not found"}})
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(user && isMatch){
        const token = jwt.sign({username:user.username,avatar:user.avatar,email:user.email,id:user._id,role:user.role},process.env.JWT_SCRET_KEY,{expiresIn:"1d"})
        return res.status(200).json({
            status:"success",
            data:{token},
        })
    }
    else{
        return res.status(400).json({status:"fail",data:{user:"email or password incorrect"}})
    }
    
}

export const register = async(req,res)=>{
    const oldUser = await User.findOne({email:req.body.email})

    if(oldUser){
        return res.status(400).json({status:"fail",data:{user:"user already exists"}})
    }

    const hashPassword = await bcrypt.hash(req.body.password,10)

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        role:req.body.role,
        avatar:req.file?.path,
    })
    newUser.save().then((user)=>{
        return res.status(201).json({status:"success",data:{user}})
    }).catch((error)=>{
        return res.status(404).json({status:"error",message:error.message})
    })
}