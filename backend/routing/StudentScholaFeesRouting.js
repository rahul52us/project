const protect = require('../config/protect')
const router = require('express').Router()
const {CreateFees,UpdateScholarFeesDetail,GetStudentFeesDetails} = require('../config/controller/StudentScholarFeesController')

router.post('/get',[protect,GetStudentFeesDetails])
router.post('/create',[protect,CreateFees])
router.put('/update',[protect,UpdateScholarFeesDetail])


module.exports = router;