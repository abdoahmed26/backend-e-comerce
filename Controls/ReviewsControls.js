import { Review } from "../modules/reviewsSchema.js"

export const getReviews = async(req,res)=>{
    const {id} = req.params;
    const allReviews = await Review.find({courseId:id})
    return res.status(200).json({status:"success",data:{reviews:allReviews}})
}

export const addReviews = (req,res)=>{
    const {id} = req.params;
    const newReview = new Review({
        ...req.body,
        userId:req.user.id,
        username:req.user.username,
        userImg:req.user.avatar,
        courseId:id,
    })
    newReview.save().then((review)=>{
        return res.status(201).json({status:"success",data:{review}})
    }).catch((error)=>{
        return res.status(404).json({status:"error",message:error.message})
    })
}

export const updateReview = (req,res)=>{
    const {id} = req.params;
    Review.findOneAndUpdate({_id:id,userId:req.user.id},{...req.body},{new:true}).then((review)=>{
        if(!review){
            return res.status(404).json({status:"fail",data:{review:"review not found"}})
        }
        return res.status(200).json({status:"success",data:{review}})
    }).catch((error) => {
        return res.status(404).json({status:"error",message:error.message})
    });
}

export const deleteReview = (req,res)=>{
    const {id} = req.params;
    Review.findOneAndDelete({_id:id,userId:req.user.id}).then((review)=>{
        if(!review){
            return res.status(404).json({status:"fail",data:{review:"review not found"}})
        }
        return res.status(200).json({status:"success",data:null})
    }).catch((error) => {
        return res.status(404).json({status:"error",message:error.message})
    });
}