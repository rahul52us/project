const mongoose = require('mongoose')

const PdfSchema =  mongoose.Schema({
    categary : {
        type : String,
        required : true,
        trim : true
    },
    title : {
        type : String,
        required : true
    },
    pdf : {
        type : String,
        required : true
    },
    isPaid : {
        type : Boolean,
        default : false
    }    
},{timestamps : true})

module.exports = mongoose.model('Pdf',PdfSchema)