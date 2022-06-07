const User = require('../schema/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const protect = async(req,res,next) => {    
    try
    {                      
    const token =  await req.headers.authorization ? req.headers.authorization.split(' ')[1] : 'null'   
    if(token!=='null')
    {        
        const decodedToken = jwt.verify(token,process.env.SECRET_KEY)
        if(decodedToken)
        {
            const user = await User.findOne({_id : decodedToken.userId , "tokens.token":token}).select('-password -tokens')
            if(user)
            {
                req.user = user
                next()
            }
            else
            {
                res.status(401).send("UnAuthorization User")
            }
        }
        else        
        {
            res.status(401).send("UnAuthorization User")
        }
    }
    else
    {
        res.status(401).send("UnAuthorization User")
    }
   }
   catch(err)
   {              
       res.status(500).json(err.message)
   }
}
module.exports = protect;