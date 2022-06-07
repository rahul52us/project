const AsyncHandler = require('express-async-handler')
const Pdf = require('../../schema/PdfSchema')
const User = require('../../schema/userSchema')
const pdfCategary = require('../../schema/pdfCategary')


const CreatePdf = AsyncHandler(async(req,res) => {

    const {title , pdf , categary , isPaid } = req.body;

    console.log(req.body)

    if(!title || !pdf || !categary)
    {
        res.status(400).send("Please Fill the all datas")
        return 
    }
    try
    {
        const createdPdf =  new Pdf({
            title : title,
            pdf : pdf,
            categary:categary,
            isPaid : isPaid
        })

        const savedPdf =  await createdPdf.save()
        if(savedPdf)
        {
            console.log(savedPdf)
            res.status(201).send(savedPdf)
        }
        else
        {
            res.status(402).send("can't create please try again later")
        }
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})


const deletePdf = AsyncHandler(async(req,res) => {

    const {_id} = req.body;

    if(!_id)
    {
        res.status(400).send("please fill the all data")
        return 
    }    
    try
    {
        const deletedPdf = await Pdf.findByIdAndDelete(_id)
        if(deletedPdf)
        {
            res.status(201).send(deletedPdf)
        }
        else
        {
            res.status(402).send("can't delete please try again later")
        }
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})


const EditPdf = AsyncHandler(async(req,res) => {

    const {_id} = req.body;

    if(!_id)
    {
        res.status(400).send("please fill the all data")
        return 
    }    
    try
    {
        const updatedPdf = await Pdf.findByIdAndUpdate(_id,{$set : req.body.contentData},{new:true})
        if(updatedPdf)
        {
            res.status(201).send(updatedPdf)
        }
        else
        {
            res.status(402).send("can't update please try again later")
        }
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})

const getAllCategaryPdf = AsyncHandler(async(req,res) => {
    const {categary,page} = req.body;        
    if(!categary || !page)
    {
        res.status(400).send("Please Provide the All Fields")
        return 
    }
    try
    {
        if(categary==="all")
        {
            const categaryPdf = await Pdf.find().skip((req.body.page - 1) * 2).limit(2)    
            console.log(categaryPdf)
            res.status(200).send(categaryPdf)
            return
        }
        const categaryPdf = await Pdf.find({categary:categary}).skip((req.body.page - 1) * 2).limit(2)    
        if(categaryPdf)
        {
            res.status(200).send(categaryPdf)
        }
        else
        {
            res.status(402).send("can't get the pdf please try again later")
        }
    }
    catch(err)
    {        
        res.status(500).send(err.message)
    }
})


const getPaidPdf = AsyncHandler(async(req,res) => {

    const {email,category} = req.body;
    
    if(!email || !category)
    {
        res.status(400).send("Please fill the all fields")
        return 
    }

    try
    {
        const CreatedUser = await User.findOne({email})

        if(CreatedUser)
        {
            if(CreatedUser.pdfAccess.includes(category))
            {
                res.status(200).send(`have access for ${category}`)
            }
            else
            {
                res.status(402).send(`do not have access for ${category}`)
            }
        }
        else
        {
            res.status(400).send("this user does not exists First login is required")
        }
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})



const CreatePdfCategary = AsyncHandler(async(req,res) => {

    const {title} = req.body

    if(!title)
    {
        res.status(400).send("Please insert the all fields")
        return 
    }
    try
    {
        const pdfs = await pdfCategary.find({title : title})
        if(pdfs.length<=0)
        {
            const CreatedCategary = await new pdfCategary({
                title : title
            })

            const createdCategaryPdf = await CreatedCategary.save()
            res.status(201).send(createdCategaryPdf)            
        }
        else
        {
            const allPdfs = await pdfCategary.find()
            res.status(402).send({ pdfCategaries : allPdfs , errorMessage : "this categary is already exists please choose another title" })
            return 
        }
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})

const FetchPdfCategary = AsyncHandler(async(req,res) => {
    try
    {
            const allPdfs = await pdfCategary.find()
            res.status(200).send(allPdfs)
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})


module.exports = {CreatePdf,getPaidPdf,getAllCategaryPdf,deletePdf,EditPdf,CreatePdfCategary,FetchPdfCategary}