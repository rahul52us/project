const AsyncHandler = require('express-async-handler')
const StudentScholarFees = require('../../schema/StudentScholarFees')
const User = require('../../schema/userSchema')


const GetStudentFeesDetails = AsyncHandler(async(req,res) => {
    if(!req.body._id || !req.body.userId)
    {
        res.status(400).json("Please Provide the All Info !")
        return
    }
    try
    {
        const user = await User.findById(req.body.userId)
        if(!user)
        {
            res.status(422).json("user does not exists for this student fees structure !")
            return
        }
        const studentFeesDetails = await StudentScholarFees.findById(req.body._id)
        if(studentFeesDetails)
        {            
            res.status(200).json(studentFeesDetails)
        }
        else
        {
            res.status(400).json(`the fees details does not exists for ${user.email} or something went wrong`)
            return
        }
    }
    catch(err)
    {
        res.status(500).json(err.message)
    }
})

const  CreateFees = AsyncHandler(async(req,res) => {
    if(!req.body.userId || !req.body.FeesInfo || !req.body.TotalFees || !req.body.remainingFees  || !req.body.NoOfInstallment  || !req.body.FinancialYear)
    {
        res.status(400).json("Please Provide the All Info")
        return 
    }
    try
    {
        req.body.FeesInfo = JSON.parse(req.body.FeesInfo)
        req.body.FinancialYear = JSON.parse(req.body.FinancialYear)
        const user = await User.findById(req.body.userId)
        if(!user)
        {
            res.status(400).json("This user doesn not exists !")
            return 
        }
        const studentFeesDetails = await StudentScholarFees.findOne({userId : req.body.userId})
        if(studentFeesDetails)
        {            
            res.status(400).json("Student Fees details are already exists , thus its time to update the fees Details !")
            return 
        }
        const CreatedFees = await new StudentScholarFees(req.body)
        if(CreatedFees)
        {
            var savedFees = await CreatedFees.save()
            user.ScholarFees = savedFees._id
            await user.save()
            res.status(201).json(savedFees)
            return
        }
        else 
        {
            res.status(422).json("Something went wrong while creating the Fees Details")
            return
        }
    }
    catch(err)
    {
        res.status(500).json(err.message)
        return 
    }
})

const UpdateScholarFeesDetail  = AsyncHandler(async(req,res) => {
    if(!req.body._id)
    {
        res.status(400).json("Please Provide the All Information!")
        return
    }
    try
    {
        const updatedData = await StudentScholarFees.findByIdAndUpdate(req.body._id,req.body,{new:true})        
        if(updatedData)
        {
            res.status(200).json(updatedData)
            return 
        }
        else
        {
            res.status(400).json("Student Fees details does not exists !")
            return 
        }            
    }
    catch(err)
    {
        res.status(500).json(err.message)
        return 
    }
})

module.exports = {CreateFees , UpdateScholarFeesDetail , GetStudentFeesDetails}