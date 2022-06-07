const router = require('express').Router()
const protect = require('../config/protect')
const {CreateMessage} = require('../config/controller/MessageController')
const {GetChatMessages} = require('../config/controller/MessageController')

router.post('/create/',[protect,CreateMessage])
router.get('/getMessages/:chatId',[GetChatMessages])

module.exports = router;


