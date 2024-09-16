import multer, { diskStorage } from 'multer';

const storage = diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads")
    },
    filename : (req,file,cb)=>{
        const exit = file.mimetype.split("/")[1]  // image/jpeg => ["image","jpeg"]
        const fileName = `${file.fieldname}-${Date.now()}.${exit}`
        cb(null,fileName)
    }
})

const fileFilter = (req,file,cb)=>{
    const exit = file.mimetype.split("/")[0]
    if(exit !== "image"){
        return cb(null,req.errorUploadFile = true)
    }
    return cb(null,true)
}

export const upload = multer({ storage,fileFilter })