const router = require('express').Router()
const { CreateComment , DeleteComment } = require('../config/controller/CommentController')

const protect = require('../config/protect')

router.post('/create',[protect,CreateComment])
router.post('/delete',[protect,DeleteComment])

module.exports = router;