import { User } from "../modules/usersSchema.js";

export const getUser = (req,res)=>{
    User.findById(req.user.id,{"__v":false,"password":false}).then((user)=>{
        if(!user){
            return res.status(404).json({status:"fail",data:{user:"user not found"}})
        }
        return res.status(200).json({status:"success",data:{user}})
    }).catch((error)=>{
        return res.status(404).json({status:"error",message:error.message})
    })
}

export const updateUser = (req,res)=>{
    User.findByIdAndUpdate(req.user.id,{...req.body,avatar:req.file?.path},{new: true,select:{"password":false,"__v":false}}).then((user)=>{
        if(!user){
            return res.status(404).json({status:"fail",data:{user:"user not found"}})
        }
        return res.status(200).json({
            status:"success",
            data:{user},
        })
    }).catch((error)=>{
        return res.status(404).json({status:"error",message:error.message})
    })
}

export const deleteUser = (req,res)=>{
    User.findByIdAndDelete(req.user.id).then((user)=>{
        if(!user){
            return res.status(404).json({status:"fail",data:{user:"user not found"}})
        }
        return res.status(200).json({status:"success",data:null})
    }).catch((error)=>{
        return res.status(404).json({status:"error",message:error.message})
    })
}