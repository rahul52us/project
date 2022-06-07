const YouTube = require('../../schema/youtubeSchema')
const YoutubeVideoCategary = require('../../schema/YoutubeVideoCategary')
const AsyncHandler = require('express-async-handler')

const CreateYouTube = AsyncHandler(async(req,res) => {

    const {categary,title,url} = req.body;

    if(!categary || !title || !url)
    {
        res.status(400).send("Please Fill the all Fields")
        return 
    }
    try
    {
        const CreateYouTube = await new YouTube({
            url : url,
            categary:categary,
            title : title
        })
        const savedYouTube = await CreateYouTube.save()
        if(savedYouTube)
        {
            res.status(201).send(savedYouTube)
        }
        else
        {
            res.status(402).send("can't created due to some reason please try again later")
        }
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})

const EditYouTube = AsyncHandler(async(req,res) => {

    const {_id} = req.body;
    if(!_id)
    {
        res.status(400).send("Please Fill the all Fields")
        return 
    }
    try
    {
        const updatedYoutube = await YouTube.findByIdAndUpdate(_id,{$set : req.body },{new : true})
        if(updatedYoutube)
        {
            res.status(200).send(updatedYoutube)
        }
        else
        {
            res.status(402).send("can't updated please try again later")
        }
        
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})

const DeleteYouTube = AsyncHandler(async(req,res) => {

    const {id} = req.body;

    if(!id)
    {
        res.status(400).send("please fill the all Fields")
        return 
    }
    try
    {
        const deletedYoutube = await YouTube.findByIdAndDelete(id)
        if(deletedYoutube)
        {
            res.status(200).send(deletedYoutube)
        }
        else
        {
            res.status(400).send("can't delete please try again later")
        }
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})


const getYouTubeCategary = AsyncHandler(async(req,res) => {

    var page = req.query.page;
    const categary =  req.params.categary;
        
    if(categary==="allData")
    {
        const youtubes = await YouTube.find().skip((page - 1) * 10).limit(10)
        if(youtubes)
        {
            res.status(200).send(youtubes)
            return
        }        
    }
    try
    {
        const youtubes = await YouTube.find({categary : categary}).skip((page - 1) * 10).limit(10)

        if(youtubes)
        {
            res.status(200).send(youtubes)
        }
        else
        {
            res.status(402).send("can't get the videos please try again later")
        }        
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})



const CreateYouVideoCategary = AsyncHandler(async(req,res) => {
    const {categary } = req.body
    if(!categary)
    {
        res.status(400).send("Please insert the all fields")
        return 
    }
    try
    {
        const Youtube = await YoutubeVideoCategary.find({categary : categary})
        if(Youtube.length<=0)
        {
            const CreatedCategary = await new YoutubeVideoCategary({categary : categary})

            const createdCategaryPdf = await CreatedCategary.save()
            res.status(201).send(createdCategaryPdf)            
        }
        else
        {
            const allYoutube = await YoutubeVideoCategary.find()
            res.status(400).send({ YoutubeCategaries : allYoutube , errorMessage : "this categary is already exists please another title" })
            return 
        }
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})


const getYouTubeALLCategary = AsyncHandler(async(req,res) => 
{
    try
    {
        const YoutubeCategaries =  await YoutubeVideoCategary.find()
        res.status(200).send(YoutubeCategaries)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
})
module.exports = { CreateYouTube ,EditYouTube ,DeleteYouTube ,getYouTubeCategary , CreateYouVideoCategary , getYouTubeALLCategary }