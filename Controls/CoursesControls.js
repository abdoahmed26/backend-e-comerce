import { Course } from "../modules/coursesSchema.js";

export const createCourse = (req,res)=>{
    const newCourse = new Course({...req.body,courseImg:req.file?.path})
    newCourse.save().then((course)=>{
        return res.status(200).json({
            status:"success",
            data:{course},
        })
    }).catch((err)=>{
        return res.status(404).json({status:"error",message:err.message})
    })
}

export const getAllCourses = async(req,res)=>{
    const query = req.query
    const limit = query.limit || 5;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const courses = await Course.find({},{"__v":false}).limit(limit).skip(skip)
    if(!courses) {
        return res.status(404).json({status:"error",message:"No courses"})
    }
    return res.status(200).json({status:"success",data:{courses}})
}

export const getSingleCourse = (req,res)=>{
    const {id} = req.params;
    Course.findById(id,{"__v":false}).then((course)=>{
        if(!course){
            return res.status(404).json({status:"fail",data:{course:"course not found"}})
        }
        return res.status(200).json({status:"success",data:{course}})
    }).catch((error)=>{
        return res.status(404).json({status:"error",message:error.message})
    })
}

export const updateCourse = (req,res)=>{
    const {id} = req.params;
    Course.findByIdAndUpdate({_id: id},{...req.body,courseImg:req.file?.path},{new:true}).then((course)=>{
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

export const deleteCourse = (req,res)=>{
    const {id} = req.params;
    Course.findByIdAndDelete({_id:id}).then((course)=>{
        if(!course){
            return res.status(404).json({status:"fail",data:{course:"course not found"}})
        }
        return res.status(200).json({status:"success",data : null})
    }).catch((error)=>{
        return res.status(404).json({status:"error",message:error.message})
    })
}