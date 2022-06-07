const mongoose = require('mongoose')


const pdfCategarySchema =  mongoose.Schema({

    title : {
        type : String,
        required : true,
        trim : true
    }
},{timeStamps : true})

module.exports =  mongoose.model('pdfCategary',pdfCategarySchema)


