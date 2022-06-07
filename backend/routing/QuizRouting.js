const { CreateQuiz , GetAllQuiz , GetQuizCategary , CreateQuizCategary , AddNewTopic , DeleteQuiz , EditQuizQuestion  } = require('../config/controller/QuizController')
const protect = require('../config/protect')
const router = require('express').Router()


router.get('/getQuizCategary',GetQuizCategary)
router.post('/createQuizCategary',[protect,CreateQuizCategary])
router.post('/create',[protect,CreateQuiz])
router.post('/get/Allquiz',GetAllQuiz)
router.put('/addNewCategaryTopic',AddNewTopic)
router.post('/deletequiz',[protect,DeleteQuiz])
router.put('/editQuizQuestion',EditQuizQuestion)
module.exports = router;

