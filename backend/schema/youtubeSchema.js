const mongoose = require('mongoose')



const YouTubeSchema =  mongoose.Schema({

    title : {
        type : String,
        required : true,
        trim:true
    },

    url : {
        type : String,
        required : true,
        trim:true
    },

    categary : {
        type : String,
        trim:true,
        required:true
    }

},{timestamps : true})


module.exports = mongoose.model("YouTube",YouTubeSchema) 