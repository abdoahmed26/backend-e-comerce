import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).json({status:"fail",message:"unauthorized"})
    }
    const token = req.headers.authorization.split(" ")[1]
    
    jwt.verify(token, process.env.JWT_SCRET_KEY, (err, user)=>{
        if(err){
            return res.status(401).json({status:"fail",message:err.message})
        }
        req.user = user;
        next();
    })
}