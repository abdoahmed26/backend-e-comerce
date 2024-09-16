
export const ErrorUploadFile = (req,res,next)=>{
    if(req.errorUploadFile){
        return res.status(404).json({status:"fail",message:"this file is not support"})
    }
    next()
}