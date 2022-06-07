const mongoose = require('mongoose')

const QuizSchema = mongoose.Schema({

    Question : {
        type : String,
        required : true
    },
    Categary : {
        type : String,
        required : true
    },   
    Answers :[        
        {
            answer :{
                type : String,
                required:true
            },
            description : {
                type : String,
                default : null
            },
            correct : {
                type : Boolean,
                default : false
            }
        }
    ], 
    Topic: {
        type : String,
        required : true,
        trim : true
    }    
},{timestamps:true})


module.exports = mongoose.model("Quiz",QuizSchema)