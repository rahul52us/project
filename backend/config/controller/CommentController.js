const Asynchandler = require('express-async-handler')
const Comment = require('../../schema/CommentSchema');
const Blog = require('../../schema/BlogSchema')

const CreateComment = Asynchandler(async(req,res) => {

    if(!req.body.blogId || !req.body.userId || !req.body.comment) 
    {
      
        return res.status(400).send("please fill the all fields")
    }
    try    
    {
        const blog = await Blog.findById(req.body.blogId)
        if(blog)
        {
            const comment = new Comment({
                Blog : blog._id,
                comment : req.body.comment,
                user : req.body.userId
            })
            const savedComment = await comment.save()
            await blog.updateOne({$push : { comments : savedComment._id } , new : true  })                 

            const ss = await savedComment.populate('user','_id name email pic')
            console.log(ss)
            res.status(201).send(ss)
        }
        else
        {
            res.status(400).json("this is blog does not exists")
        }
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})



const DeleteComment = Asynchandler(async(req,res) => {

    if(!req.body.BlogId || !req.body.commentId)
    {
        res.status(400).send("Please Provide the All Details !!")
        return 
    }
    try
    {
        const deletedComment = await Comment.findOne({Blog :  req.body.BlogId , _id : req.body.commentId})        
        if(deletedComment)
        {
            var deleted= await deletedComment.delete()
            console.log(deleted)
            res.status(200).send(deleted) 
        }
        else
        {
            res.status(422).send("Can't delete this comment , please try again later !")
            return 
        }
        
    }
    catch(err)
    {
        req.status(500).send(err.message)
        return
    }
})

module.exports = {CreateComment , DeleteComment}