import { Cart } from "../modules/cartSchema.js";

export const getCart = async(req,res)=>{
    const allCart = await Cart.find({userId:req.user.id})
    return res.status(200).json({status:"success",data:{cart:allCart}})
}

export const addCourseToCart = (req,res)=>{
    const newCourse = new Cart({
        ...req.body,
        userId:req.user.id
    })
    newCourse.save().then((course)=>{
        return res.status(201).json({status:"success",data:{course}})
    }).catch((err)=>{
        return res.status(404).json({status:"error",message:err.message})
    })
}

export const updateInCart = (req,res)=>{
    const {id} = req.params;
    Cart.findOneAndUpdate({_id:id,userId:req.user.id},{...req.body},{new:true}).then((course)=>{
        if(!course){
            return res.status(404).json({status:"fail",data:{course:"course not found"}})
        }
        return res.status(200).json({
            status:"success",
            data:{course}
        })
    }).catch((error)=>{
        return res.status(404).json({status:"error",message:error.message})
    })
}

export const deleteFromCart = (req,res)=>{
    const {id} = req.params;
    Cart.findOneAndDelete({_id:id,userId:req.user.id}).then((course)=>{
        if(!course){
            return res.status(404).json({status:"fail",data:{course:"course not found"}})
        }
        return res.status(200).json({
            status:"success",
            data:null
        })
    }).catch((error)=>{
        return res.status(404).json({status:"error",message:error.message})
    })
}