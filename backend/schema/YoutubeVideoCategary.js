const mongoose = require('mongoose')

const YoutubeVideoCategarySchema =  mongoose.Schema({

    categary : {
        type : String,
        required : true,
        trim : true
    },  

},{timestamps : true})



module.exports = mongoose.model('YoutubeVideoCategary',YoutubeVideoCategarySchema)