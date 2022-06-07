const mongoose = require('mongoose')


const StudentScholarFees = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        required : true
    },    

    FeesInfo : [{
        StartDate : {
            type : Date,
            required : true,
            trim : true
        },
        EndDate : {
            type : Date,
            required : true,
            trim : true
        },
        depositBy : {
            type : String,
            trim : true,
            required : true
        },
        amount : {
            type : String,
            trim : true,
            required : true            
        },     
    }],

    TotalFees : {
        type : String,
        trim : true
    },
    
    remainingFees:{
        type : String,
        trim : true
    },
    NoOfInstallment:{
        type : Number,
        required : true
    },
    FinancialYear : [{
        StartYear : {
            type : Date,
            required : true,
            trim : true
        },
        EndYear : {
            type : Date,
            required : true,
            trim : true
         }}]
})

module.exports = mongoose.model('StudentScholarFees',StudentScholarFees);