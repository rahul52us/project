const multer = require("multer")
const protect = require("./protect")
const path = require('path')

const storage = multer.diskStorage({
    destination : (req,file,cb) => {        
        cb(null,'public/pdfs')
    },
    filename:(req,file,cb) => {        
        cb(null, req.user.email + path.extname(file.originalname));
    }
})

const upload = multer({storage})
const uploadImage = ([upload.single('file'),(req,res)=>{
    try
    {        
        res.status(200).json("this is new post")
    }
    catch(err)
    {
        res.status(400).json(err.message)
    }
}])

module.exports = {uploadImage}