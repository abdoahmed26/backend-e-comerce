import { User } from "../modules/usersSchema.js";
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { sendVerificationCode } from "../utils/sendEmailPassword.js"
import { Code } from "../modules/forgotPasswordSchema.js";

export const updatePassword = async(req,res)=>{
    const {oldPassword,newPassword} = req.body
    const user = await User.findOne({_id:req.user.id})

    if(!user){
        return res.status(400).json({status:"fail",data:{user:"user not found"}})
    }

    const isMatch = await bcrypt.compare(oldPassword,user.password)

    if(!isMatch){
        return res.status(400).json({status:"fail",data:{user:"password is not correct"}})
    }
    else if(user && isMatch){
        const newHashPassword = await bcrypt.hash(newPassword,10)
        User.updateOne({_id:user._id},{password:newHashPassword},{new:true})
        .then((updateUser)=>{
            return res.status(200).json({status:"success",data:{user:updateUser}})
        }).catch((error)=>{
            return res.status(404).json({status:"error",message:error.message})
        })
    }
}

export const forgotPassword = async(req,res)=>{
    const {email} = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({status:"fail",data:{user:"user not found"}})
    }

    const otp = crypto.randomBytes(3).toString("hex")
    const otpExpiry = Date.now() + 300000;

    sendVerificationCode(email,user.username, otp)
    .then(async() => {
        await Code.deleteMany({userId:user._id})
        const newCode = new Code({
            code:otp,
            codeExpired:otpExpiry,
            userId: user._id,
        })
        newCode.save().then(() => {
            res.status(200).json({status:"success", message: 'Verification code sent to your email' });
        }).catch(error => {
            res.status(500).json({status:"fail", message: error.message });
        });
    })
    .catch(error => {
        res.status(500).json({status:"fail", message: error.message });
    });
}

export const verifyCode = async(req, res) => {
    const { email, code } = req.body;
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({status:"fail",data:{user:"user not found"}})
    }
    const userCode = await Code.findOne({userId:user._id})
    if(!userCode){
        return res.status(400).json({status:"fail",data:{code:"No code found"}})
    }
    if(userCode.code !== code){
        return res.status(400).json({status:"fail",message:"Invalid Code"});
    }
    if(Date.now() > userCode.codeExpired){
        await Code.deleteOne({_id:userCode._id})
        return res.status(400).json({status:"fail",message:"Code expired"})
    }
    else{
        return res.status(200).json({status:"success", message:'Code verified successfully' })
    }
}

export const resetPassword = async(req, res) => {
    const { email, password, code } = req.body;
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({status:"fail",data:{user:"user not found"}})
    }
    const userCode = await Code.findOne({userId:user._id})
    if(!userCode){
        return res.status(400).json({status:"fail",data:{code:"No code found"}})
    }
    if(userCode.code !== code){
        return res.status(400).json({status:"fail",message:"Invalid Code"});
    }
    if(Date.now() > userCode.codeExpired){
        await Code.deleteOne({_id:userCode._id})
        return res.status(400).json({status:"fail",message:"Code expired"})
    }
    else{
        const hashedPassword = await bcrypt.hash(password,10)
        User.updateOne({_id:user._id},{password:hashedPassword},{new:true})
        .then((updateUser)=>{
            return res.status(200).json({status:"success",data:{user:updateUser}})
        }).catch((error)=>{
            return res.status(404).json({status:"error",message:error.message})
        })
    }
}