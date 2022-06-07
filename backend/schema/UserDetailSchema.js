const mongoose = require('mongoose')


const userDetailsSchema =  mongoose.Schema({

    userId : {
       type : mongoose.Schema.Types.ObjectId,
       ref : 'User'
    },
    className : {
        type : String,
        trim : true        
    },
    section : {
        type : String,
        trim : true,
        default : 'A'
    },
    standard :     
    {
        type : String,
        trim : true,
        enum : ['English' , 'Hindi' , 'other'],
        default : 'English',
        message : "Please Choose the valid medium "
    },
    description : {
        type : String
    },
    DOB : {
        type : String
    },
    BloodGroup:{
        type:String,
        trim:true
    },    
    FatherName : {
        type : String,
        trim:true
    },
    MotherName : {
        type : String,
        trim:true
    },

    sibling:{
        type : String
    },
    gender : {
        type : String,
        trim : true,
        enum :
        {
            values : ['male','female','transgender'],
            message : "please provide the correct gender use male or female or transgender"
        } 
    },
    Age : {
        type : String
    },
    address : {
        type : String
    },
    pinCode : {
        type : String
    },
    country : {
        type : String,
        trim : true
    },
    city : {
            type : String,
            trim : true
        },
    state : {
        type : String,
        trim : true
    },
    PhoneNo : {
        type : String,
        trim : true
    }
},{timestamps : true})

module.exports = mongoose.model('UserDetails',userDetailsSchema)