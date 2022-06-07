const mongoose = require('mongoose')


const BlogSchema = mongoose.Schema({    
    title : {
        required : true,
        type : String,
        trim : true,
        unique:true        
    },
    body : {
        required : true,
        type : String        
    }, 
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'            
        }
    ],      
    comments : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
        }
    ],       
},{timestamps : true})


module.exports = mongoose.model('Blog',BlogSchema)


    