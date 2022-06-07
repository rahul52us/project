const router = require('express').Router()
const {CreateBlog , getsingleBlog} = require('../config/controller/BlogController')
const {uploadBlog} = require('../config/controller/BlogController')
const {getBlogs} = require('../config/controller/BlogController')
const {LikeBlog } = require('../config/controller/BlogController')
const protect = require('../config/protect')


router.post('/create',[CreateBlog])
router.post('/upload-blog',[protect,uploadBlog])
router.get('/getBlogs/:page',[getBlogs])
router.put('/likeBlog',[LikeBlog])
router.post('/getsingleBlog',[getsingleBlog])

module.exports = router;