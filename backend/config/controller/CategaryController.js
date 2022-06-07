const Asynchandler = require('express-async-handler')
const Blog = require('../../schema/BlogSchema');



const CreatePdfCategary = Asynchandler(async(req,res) => 
{
    const {title} = req.body;

    if(!title) 
    {
        res.status(400).send("Please fill the all Fields")
    }
    
    try
    {

    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})

module.exports = {CreatePdfCategary}