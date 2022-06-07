const Asynchandler = require('express-async-handler')
const Blog = require('../../schema/BlogSchema');
const multer = require('multer')
const User = require('../../schema/userSchema');
const protect = require('../protect');

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        //console.log(req.body)
        console.log(file)
        cb(null,'public/images')
    },
    filename:(req,file,cb) => {
        cb(null,file.originalname)
    }
})


const upload = multer({storage})
const uploadBlog = ([upload.single('file'),(req,res)=>{
    try
    {        
        res.status(200).json("this is new post")
    }
    catch(err)
    {
        res.status(400).json(err.message)
    }
}])

const CreateBlog = Asynchandler(async(req,res) => 
{
    const {title , body } = req.body;    
    if(!title || !body)
    {
        res.status(400).send("Please fill the all Fields")
    }
    try
    {
        const blogs = await new Blog({
            title : title,
            body : body
        })
        const savedBlog = await blogs.save()
        if(savedBlog)
        {
            res.status(201).send(savedBlog)
        }
        else
        {
            res.status(402).send("something went wrong while creating the blog please try again later")
        }
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})
const getBlogs = Asynchandler(async(req,res) => {
    const {page} = req.params;    
    try
    {
        var blogs = await Blog.find().skip((page - 1) * 3).limit(3).populate('comments')
        blogs = await User.populate(blogs,{ path:'comments.user',select : '-password -tokens -pdfAccess'})
        res.status(200).send(blogs)
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }  
})


const getsingleBlog = Asynchandler(async(req,res) => {
    try
    {        
        var blogs = await Blog.findById(req.body._id).populate('comments')
        blogs = await User.populate(blogs,{ path:'comments.user',select : '-password -tokens -pdfAccess'})        
        if(blogs)
        {
            res.status(200).send(blogs)
            return
        }
        else
        {            
            res.status(400).send(" this blog does not exits ")
            return 
        }
    }
    catch(err)
    {
        console.log(err.message)
        res.status(500).send(err.message)
    }
})


const LikeBlog = Asynchandler(async(req,res) => {
    try
    {
        const updatedBlog = await Blog.findById(req.body.BlogId)

        if(updatedBlog)
        {
            if(!updatedBlog.likes.includes(req.body.userId))
            {
                await updatedBlog.updateOne({$push : { likes : req.body.userId } , new : true  })        
                res.status(200).send("Blog has been liked")
            }
            else
            {
                await updatedBlog.updateOne({$pull : { likes : req.body.userId } , new : true  })
                res.status(200).send("Blog has been dislikes")
            }
        }
        else        
        {
            res.status(400).send("this Blog does not exists")
        }
        
    }
    catch(err)
    {        
        res.status(500).send(err.message)
    }
})




module.exports = {CreateBlog , uploadBlog , getBlogs , LikeBlog , getsingleBlog}