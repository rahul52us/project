const AsyncHandler = require('express-async-handler')
const User = require('../../schema/userSchema')
const bcrypt = require('bcrypt')
const generateToken = require('../generateToken')
const UserDetails = require('../../schema/UserDetailSchema')
const Comment = require('../../schema/CommentSchema')
const {requestPasswordReset} = require('../utils/service')
const Token = require('../../schema/TokenSchema')
const sendEmail = require('../utils/sendEmail')

const CurrentUserMe = AsyncHandler(async(req,res)=>{
    try
    {
        res.status(200).send(req.user)
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})


// this is a api for the registering the user

const RegisterUser = AsyncHandler(async(req,res) => {
    const {name,email,password} = req.body;    
    if(!name || !email || !password)
    {
        res.status(400).json("All Field are required")
        return
    }
    try
    {
        const user = await User.findOne({email:email})
        if(user)
        {                        
            res.status(402).json("user is already exists")
        }        
        else
        {
            const hashPassword = await bcrypt.hash(password,10)
            const newUser = await new User({
                email:email,
                name:name,
                password:hashPassword                
            })
            const savedUser = await newUser.save()
            if(savedUser)
            {
                const generatedToken = await generateToken(savedUser._id)
                savedUser.tokens = await savedUser.tokens.concat({token : generatedToken })                
                await savedUser.save()
                res.cookie("KFC_AUTHORIZATION_TOKEN",generatedToken,{maxAge : 31557600000  })                
                res.status(201).send({
                    name : savedUser.name,
                    email : savedUser.email,
                    pic:savedUser.pic,
                    pdfAccess:savedUser.pdfAccess,
                    authorization_token:generatedToken                    
                })
                
            }
            else
            {
                res.status(422).send("something went wrong while creating the user try again later")
            }
        }
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})

const CreateNewUser = AsyncHandler(async(req,res) => {    
    const {name,email,password} = req.body;
    if(!name || !email || !password)
    {
        res.status(400).json("All Field are required")
        return
    }
    try
    {
        const user = await User.findOne({email:email})
        if(user)
        {                        
            res.status(402).json("user is already exists")
        }        
        else
        {
            const hashPassword = await bcrypt.hash(password,10)
            const newUser = await new User({
                email:email,
                name:name,
                password:hashPassword                
            })
            const savedUser = await newUser.save()
            if(savedUser)
            {
                const generatedToken = await generateToken(savedUser._id)
                savedUser.tokens = await savedUser.tokens.concat({token : generatedToken })                
                await savedUser.save()                
                res.status(201).send(savedUser)
            }
            else
            {
                res.status(422).send("something went wrong while creating the user try again later")
            }
        }
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})


// Delete the User Account 

const DeleteAccount = AsyncHandler(async(req,res) => {

    if(!req.params.userId)
    {
        res.status(400).send("Please Provide the All Fields")
        return
    }
    try
    {
        const user = await User.findOne({email:req.params.userId})
        if(user)
        {            
            await Comment.deleteMany({user : user._id})            
            var userdetail = await UserDetails.findById(user.ExtraInfo)            
            if(userdetail)
            {
                await userdetail.delete()            
            }
            const deleteUser = await user.delete()
            res.status(200).send(deleteUser)
        }
        else
        {
            res.status(400).send("Something went Wrong Or This user does not Exists")
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send(err.message)
    }
})

// login the users 


const LoginUser = AsyncHandler(async(req,res) => {
    if(!req.body.email || !req.body.password)
    {
        res.status(400).send("All Fields are required")
        return 
    }    
    const {email , password} = req.body;    
    try
    {
        const user = await User.findOne({email:email})
        if(user)
        {
            const decodePassword = await bcrypt.compare(password,user.password)
            if(decodePassword)
            {
                const token = await generateToken(user._id)
                user.tokens = await user.tokens.concat({token : token})
                await user.save()            
                res.cookie("KFC_AUTHORIZATION_TOKEN",token,{maxAge : 31557600000  })                
                res.status(200).json(user)
            }
            else
            {
                res.status(422).send("password does not match")
            }
        }
        else        
        {
            res.status(422).send("user does not exists")
        }
    }
    catch(err)
    {
        res.status(500).json(err.message)
    }
})


// register or login the user with the google

const GoogleLogin = AsyncHandler(async(req,res) => {
    if(!req.body.email)
    {
        res.status(400).send("all Fields are required")    
        return 
    }
    try
    {
        const user = await User.findOne({email:req.body.email}).select("-password")
        if(user)
        {
            const token = await generateToken(user._id)
            user.tokens = await user.tokens.concat({token:token})
            const savedUser = await user.save()
            res.cookie("KFC_AUTHORIZATION_TOKEN",token,{maxAge : 31557600000  })                
            res.status(200).json(savedUser)
        }
        else
        {
            const hashpassword = await bcrypt.hash(req.body.email+process.env.SECERT_KEY,10)

            const createdUser = await User.create({
                name : req.body.name,
                email : req.body.email,
                password : hashpassword,
                pic : req.body.pic
            })
            if(createdUser)
            {      
                const token = await generateToken(createdUser._id)
                createdUser.tokens = await createdUser.tokens.concat({token:token})
                const savedUser = await createdUser.save()                
                res.cookie("KFC_AUTHORIZATION_TOKEN",token,{maxAge : 31557600000  })                
                res.status(201).json({
                    _id : savedUser._id,
                    name : savedUser.name,
                    email : savedUser.email ,                    
                    pic : savedUser.pic                    
                })
            }
            else
            {
                res.status(400).json("something went wrong while creating the objects")
            }
        }        
    }
    catch(err)
    {     
        console.log(err.message)
        res.status(500).json(err.message)
    }

})

const DeleteUserToken = AsyncHandler(async(req,res) => {
    if(!req.body.userId || !req.body.tokenId || !req.body.token)
    {
        res.status(400).send("please provide the all fields")
        return 
    }    
    try    
    {
        const user = await User.findById(req.body.userId)
        if(user)
        {            
            const filterUser = await user.tokens.filter((item) => item.token!==req.body.token)                      
            user.tokens = filterUser
            const savedUser = await user.save()
            res.status(200).send(savedUser)
        }
        else
        {
            res.status(400).send("user does not exists")
        }
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})

const GetAllUsers = AsyncHandler(async(req,res) => {    
    try
    {
        var page = parseInt(req.params.page)
        const users = await User.find({Block : false }).skip((page - 1) * 10).limit(10).select('-password  -createdAt -updatedAt')        
        var headers = ['Name','Email','pic','pdfAccess','Tokens','Extra']        
        res.status(200).json({users,headers})
    }
    catch(err)
    {
        res.status(500).json(err)
    }
})



const DeleteUserpdfAccess = AsyncHandler(async(req,res) => {
    
    console.log(req.body)
    try
    {
        const user = await User.findById(req.body.userId)
        await user.updateOne({$pull : { pdfAccess : req.body.removePdf }})                
        console.log(user)
        res.status(200).send(user)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
    
})


const AddPdfUserAccess = AsyncHandler(async(req,res) => {
    try
    {
        const user = await User.findById(req.body.userId)
        await user.updateOne({$push : { pdfAccess : req.body.Addpdf }})                        
        res.status(200).send(user)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
})

const RegisterUserDetails = AsyncHandler(async(req,res)=>{
    const {email,details} = req.body;  
    if(!email || !details)
    {
        res.status(400).json("please provide the correct details ")
        return 
    }
    try
    {
        const user = await User.findOne({email : email })
        if(user)
        {
            const userDetail = await UserDetails.findOne({userId : user._id})
            if(userDetail)
            {
                res.status(400).json(`already created the details of this ${user.email}`)
            }
            else
            {
                const newUserDetails = await new UserDetails(details)
                newUserDetails.userId = user._id
                const savedNewDetailuser = await newUserDetails.save()

                if(savedNewDetailuser)
                {
                    user.ExtraInfo = savedNewDetailuser._id
                    const saveuser = await user.save()
                    res.status(200).json({saveuser,savedNewDetailuser})
                }
                else
                {
                    res.status(400).json("something went wrong while creating the new details")
                }
            }            
        }
        else
        {
            res.status(422).json("please use the valid user")
        }
    }
    catch(err)
    {
        res.status(500).json(err.message)
    }
})



const GetUserDetials = AsyncHandler(async(req,res) => {
    
    if(!req.body.email || !req.body.userId)
    {
        res.status(400).send("please provide the valid data")
        return
    }
    try
    {        
            var user = await User.findOne({email : req.body.email}).select('-password -tokens')
            if(user)
            {                
                var userdetail = await UserDetails.findById(user.ExtraInfo)                
                if(userdetail)
                {
                    res.status(200).json(userdetail)
                }
                else
                {
                    res.status(422).json(`user ${req.body.email} details does not exits`)    
                }
            }
            else
            {
                res.status(422).send(`${req.body.email} user does not exits`)
            }
        }     
    catch(err)
    {
        res.status(500).send(err.message)
    }
})



const EditUserDetails = async(req,res) => {
    if(!req.body._id || !req.body.userId)
    {
        res.status(400).send("please provide the all details")
        return 
    }
    try
    {  
        var updatedData = await UserDetails.findByIdAndUpdate(req.body._id,{$set : req.body },{new : true })
        res.status(200).send(updatedData)
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
}

const BlockUser = AsyncHandler(async(req,res) => {
    if(!req.body.userId)
    {
        res.status(400).send("Please Provide the all Fields")
        return 
    }
    try
    {
        const user = await User.findById(req.body.userId)    
        if(user)
        {
            if(user.Block) 
            {
                res.status(422).send(`${user.email} is already Block`)
                return
            }            
            user.Block = true
            const savedUser = await user.save()
            res.status(200).send(savedUser)
        }
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})

const GetBlockUsers = AsyncHandler(async(req,res) => {
     if(!req.body.page)
     {
         res.status(400).send("Please provide the all fields")        
         return 
     }   
   try
    {
        const users = await User.find({Block : true }).skip((parseInt(req.body.page) - 1) * 10).limit(10).select('-password -tokens')
        res.status(200).send(users)
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})

const UnBlockUser = AsyncHandler(async(req,res) => {

    if(req.body.userId)
    try
    {
        const user = await User.find({_id:req.body.userId , Block : true })
        if(user.length===1)
        {
            user[0].Block = false
            const savedUser = await user[0].save()
            res.status(200).send(savedUser)
        }
        else
        {
            res.status(400).send("this user does not Exist !")
            return
        }
    }
    catch(err)
    {
        console.log(err.message)
        res.status(500).send(err.message)
    }
})

const forgotEmailPassword = AsyncHandler(async(req,res) => {
    if(!req.body.email)
    {
        res.status(400).send("Please Provide the All Fields ")
        return 
    }
    try
    {
        var user = await User.find({email : req.body.email})
        if(user)
        {
            var link = await requestPasswordReset(req.body.email)
            if(link.status===400)
            {
                res.status(400).send(link.reason)
                return
            }
            if(link.status===200)
            {
                res.status(200).send("Check your Email for the email verification !")
                return
            }
            else
            {
                res.status(422).send("Something went wrong and please try again later !")
                return
            }
        }
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})

const resetEmailPassword = AsyncHandler(async(req,res) => {
    if(!req.body.password || !req.body.id || !req.body.token)
    {
        res.status(400).send("Please Provide the All Fields !")
        return 
    }
    try
    {
        var user = await User.findOne({_id : req.body.id})
        if(!user)
        {
            res.status(400).send("wrong user for the token verify !")
            return
        }

        var resetPasswordToken = await Token.findOne({userId : req.body.id})
        if(!resetPasswordToken)
        {
            res.status(400).send("this token Id does not verify")
            return
        }        
        const isValid = await bcrypt.compare(req.body.token, resetPasswordToken.token);
        if (!isValid) {
          res.status(400).send('Invalid token')
          return 
        }
        const hash = await bcrypt.hash(req.body.password,10);
        user.password = hash
        await user.save()
        // this is for the success fully password reset email 
        sendEmail(
             user.email,
            "Password Reset Successfully",
            {
              name: user.name,
              link:`${process.env.FRONTEND_ORIGIN}/login`
            },           
          );
        await resetPasswordToken.deleteOne()
        res.status(200).send("password reset successfully")
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})

const SearchByUserDetails = AsyncHandler(async(req,res) => {
    if(!req.params.page)
    {
        res.status(400).send("Please Provide the All Information !")
        return
    }
    try
    {  
        if(req.body.email || req.body.name)             
        {
            var newArr=[]
            const users = await User.find({$and : [req.body]}).skip((parseInt(req.params.page) - 1) * 10).limit(10).populate('ExtraInfo')
            users.forEach((data)=>{
                newArr.push(data)
            })            
            res.status(200).json(newArr)
        }         
        else
        {                        
            const users = await UserDetails.find({$and : [req.body]}).skip((parseInt(req.params.page) - 1) * 10).limit(10).populate('userId','-password')                      
            res.status(200).json(users)
            return
        }        
    }
    catch(err)
    {
        res.status(500).send(err.message)
        return
    }
})

module.exports =  {CurrentUserMe ,GoogleLogin , DeleteUserToken , RegisterUser , LoginUser , GetAllUsers , GetBlockUsers , DeleteUserpdfAccess , AddPdfUserAccess , RegisterUserDetails , GetUserDetials , EditUserDetails , CreateNewUser , BlockUser , UnBlockUser , DeleteAccount , forgotEmailPassword , resetEmailPassword , SearchByUserDetails}