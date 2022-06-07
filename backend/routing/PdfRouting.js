const router = require('express').Router()
const {CreatePdf, EditPdf, deletePdf} = require('../config/controller/PdfController')
const {getPaidPdf} = require('../config/controller/PdfController')
const {getAllCategaryPdf} = require('../config/controller/PdfController')
const {CreatePdfCategary} = require('../config/controller/PdfController')
const {FetchPdfCategary} = require('../config/controller/PdfController')
const {uploadImage} = require('../config/uploadImage')

const protect = require('../config/protect')

router.post('/create',[protect,CreatePdf])
router.post('/getpaidPdf',[getPaidPdf])
router.post('/upload/pdf',[protect,uploadImage])
router.post('/getAllPdf',[getAllCategaryPdf])
router.post('/createPdfCategary',[protect,CreatePdfCategary])
router.get('/fetchpdfCategaries',[FetchPdfCategary])
router.post('/deletepdf',[protect,deletePdf])
router.post('/editpdf',[protect,EditPdf])


module.exports = router;
