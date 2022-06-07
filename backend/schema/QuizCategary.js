const mongoose = require('mongoose')


const QuizCategarySchema =  mongoose.Schema({

    categary : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    Topic : 
        [
            {
                type : String,
                trim : true
            }
        ]
        
},{timeStamps : true})



module.exports =  mongoose.model('QuizCategary',QuizCategarySchema)


