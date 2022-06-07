const protect = require('../config/protect')
const router = require('express').Router()
const {CreateYouTube , EditYouTube , DeleteYouTube ,getYouTubeCategary , CreateYouVideoCategary , getYouTubeALLCategary} = require('../config/controller/YoutubeVideos')

router.post('/create/youtubecategary',[CreateYouVideoCategary])
router.post('/create',[CreateYouTube])
router.put('/edit',[EditYouTube])
router.post('/delete',[DeleteYouTube])
router.get('/:categary',getYouTubeCategary)
router.get('/get/getYouTubeAllCategary',[protect,getYouTubeALLCategary])


module.exports = router;
