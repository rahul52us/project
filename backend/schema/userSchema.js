const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    userType : {
        type : String,
        userType : ['user','admin'],
        default : 'user'
    },
    name : {
        type : String,
        trim:true,
        required:[true,'name field is required']
    },    
    email : {
        type : String,
        unique : true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        required:true
    },      
    password: {
        type : String,
        required : true,
        min:5        
    },    
    standard : {
        type : String,
        trim : true
    },
    className : {
        trim : true,
        type : String
    },
    pic: {
        type : String,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-BiIorxpeD_vgAzBTgpx9vd6EQezMODouWZWDbv8wY55bX4z56X4RuBEdeVbrYaCyxkc&usqp=CAU"    
    },
    Block:{
        type : Boolean,
        default : false
    },
    tokens :[
        {
            token:{
                type : String,
                required:true
            }
        }
    ],    
    pdfAccess :
        [  
            {  
                type : String,
                 required : true                           
            }            
        ],
    ExtraInfo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'UserDetails'
    },
    
    ScholarFees : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'StudentScholarFees'
    }


},{timestamps:true})

module.exports = mongoose.model("User",UserSchema)

