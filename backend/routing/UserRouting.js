const bcrypt = require('bcrypt');
const router = require('express').Router()
const User = require('../schema/userSchema')
const protect = require('../config/protect')
const { GetAllUsers, LoginUser, GoogleLogin, RegisterUser ,CurrentUserMe , GetBlockUsers , DeleteUserToken ,BlockUser , DeleteUserpdfAccess ,AddPdfUserAccess, GetUserDetials, RegisterUserDetails , EditUserDetails, CreateNewUser , UnBlockUser , DeleteAccount , forgotEmailPassword , resetEmailPassword , SearchByUserDetails } = require('../config/controller/userController');

router.get('/getAllUsers/:page',[protect,GetAllUsers])
router.delete('/account/delete/:userId',[protect,DeleteAccount])
router.post('/login',[LoginUser])
router.post('/google-login',[GoogleLogin])
router.post('/register',[RegisterUser])
router.post('/current/me',[protect,CurrentUserMe])
router.post('/updatedAccesspdf',[protect,DeleteUserpdfAccess])
router.post('/AddUserPdfAccess',[protect,AddPdfUserAccess])
router.post('/userDetails',[protect,RegisterUserDetails])
router.post('/getUserDetails',[protect,GetUserDetials])
router.post('/editUserDetails',[protect,EditUserDetails])
router.post('/createNewUser',[protect,CreateNewUser])
router.post('/DeleteUserToken',[protect,DeleteUserToken])
router.post('/blockUser',[protect,BlockUser])
router.post('/unBlockUser',[protect,UnBlockUser])
router.post('/getBlockUser',[protect,GetBlockUsers])
router.post('/forgot-email-password/',[forgotEmailPassword])
router.post('/reset-email-password/',[resetEmailPassword])
router.post('/searchByUserDetails/:page',[protect,SearchByUserDetails])

module.exports = router;