const mongoose = require('mongoose')


const CommentSchema = mongoose.Schema({
       
    comment : {
        required : true,
        type : String,
        trim : true
    },     
    Blog : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Blog'
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    replies : [
        {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User'
            },            
            comment : {
                    required : true,
                    type : String,
                    trim : true
            },                      
        }
    ]
       
},{timestamps : true})


module.exports = mongoose.model('Comment',CommentSchema)


    