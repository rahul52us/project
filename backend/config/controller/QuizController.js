const Quiz = require('../../schema/QuizSchema')
const QuizCategary = require('../../schema/QuizCategary')

const Asynchandler = require('express-async-handler');




const GetAllQuiz = async(req,res) => {

    if(!req.body.categary || !req.body.Topic || !req.body.Page)
    {
        res.status(400).send("Please provide the all fields")
        return
    }
    try
    {
        const quizes = await Quiz.find({
            $and : [                
                    { categary : { $regex : req.body.categary , $options : 'i'}},
                    { Topic : { $regex : req.body.Topic , $options : 'i' }}                
            ]
        }).skip((req.body.Page - 1) * 10).limit(10)
        res.status(200).send(quizes)
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
}


const CreateQuiz = Asynchandler(async(req,res) => 
{

    const { question , answers , categary , Topic } = req.body;
      
    if(!question || !answers || !categary  || !Topic)
    {
        res.status(400).send("please filled the all fields")
        return 
    }
        
     try
    {
        var dd = JSON.parse(answers)  
        const createdQuiz = new Quiz({
            Question : question,
            Answers : dd,
            Categary : categary,
            Topic : Topic            
        })
        const savedQuiz = await createdQuiz.save()
        res.status(201).send(savedQuiz)
    }


    catch(err)
    {
        res.status(500).send(err)
    }
})



const CreateQuizCategary = Asynchandler(async(req,res) => {
    
    if(!req.body.categary)
    {
        res.status(400).send("categary is required")
        return
    }
    try
    {
        const quizCate = await QuizCategary.find()
        var filterQuiz = quizCate.filter((item) => item.categary === req.body.categary)
        if(filterQuiz.length>0)
        {
            res.status(400).send(`${filterQuiz[0].categary} quiz categary is already exists`)
            return 
        }
        const CreatedCategary = new QuizCategary({
            categary : req.body.categary
        })

        const savedCategary = await CreatedCategary.save()
        res.status(201).send(savedCategary)
    }
    catch(err)
    {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        res.status(500).send(err.message)
    }
})


const GetQuizCategary = Asynchandler(async(req,res) => {

    try
    {
        const categaries = await QuizCategary.find()
        res.status(200).send(categaries)
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})



const AddNewTopic = Asynchandler(async(req,res) => {
    
    if(!req.body.Id || !req.body.Topic)
    {
        res.status(400).send("Please Fill All Fields")
        return 
    }
    try
    {
        const Quiz =  await QuizCategary.findById(req.body.Id)
        if(Quiz)
        {
            if(Quiz.Topic.includes(req.body.Topic))
            {
                res.status(422).send(`${req.body.Topic} is already exits`)
            }
            else
            {
                await Quiz.updateOne({$push : { Topic : req.body.Topic } })
                res.status(200).send(Quiz)
            }
        }        
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send(err.message)
    }
})



const DeleteQuiz = Asynchandler(async(req,res) => {

    if(!req.body.Id)
    {
        res.status(400).send("Please Fill the All Fields")
        return
    }
    try
    {
        const deletedQuiz = await Quiz.findByIdAndDelete(req.body.Id)
        if(deletedQuiz)
        {
            res.status(200).send(deletedQuiz)
        }
        else
        {
            res.status(400).send("bad request")
        }
        
    }
    catch(err)
    {
        res.status(500).send(err)
    }
})


const EditQuizQuestion = Asynchandler(async(req,res) => {    

    const {Id} = req.body;
    if(!Id)
    {
        res.status(400).send("Please Fill the All Data")
        return 
    }
    try
    {        
        if(req.body.Answers)
        {
            req.body.Answers=JSON.parse(req.body.Answers)
        }
        const UpdatedQuiz = await Quiz.findByIdAndUpdate(Id, {$set : req.body } , { new : true})
        res.status(200).send(UpdatedQuiz)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports = {CreateQuiz , GetAllQuiz , CreateQuizCategary , GetQuizCategary , AddNewTopic , DeleteQuiz , EditQuizQuestion } 