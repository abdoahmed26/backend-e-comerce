import { Wishlist } from "../modules/wishlistSchema.js"

export const getWishlist = async(req, res) =>{
    const wishlist = await Wishlist.find({userId:req.user.id})
    return res.status(200).json({status:"success",data:{wishlist}})
}

export const addToWishlist = async(req, res) => {
    const newWishlist = new Wishlist({
        ...req.body,
        userId:req.user.id
    })
    newWishlist.save().then((course)=>{
        return res.status(201).json({status:"success",data:{course}})
    }).catch((error) => {
        return res.status(404).json({status:"error",message:error.message})
    });
}

export const deleteFromWishlist = (req, res) => {
    const {id} = req.params;
    Wishlist.findOneAndDelete({_id:id, userId:req.user.id}).then((course)=>{
        if(!course){
            return res.status(404).json({status:"fail",data:{course:"course not found"}})
        }
        return res.status(200).json({status:"success",data:null})
    }).catch((error) => {
        return res.status(404).json({status:"error",message:error.message})
    });
}