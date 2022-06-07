const {CreatePdfCategary} = require('../config/controller/CategaryController')
const router = require('express').Router()


router.post('/create/pdf',[CreatePdfCategary])

module.exports = router;


