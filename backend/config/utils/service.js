const Asynchandler = require('express-async-handler')
const JWT = require("jsonwebtoken");
const User = require('../../schema/userSchema')
const sendEmail = require('./sendEmail')
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Token = require('../../schema/TokenSchema');




const requestPasswordReset = async (email) => {   
    if(!email)
    {        
      return {status : 400 , reason :'user does not exists'}
    }
    try
    {
        const user  = await User.findOne({email : email})
        if(!user)
        {            
            return {status : 400 , reason :'user does not exists'}
        }
        const token = await Token.findOne({userId : user._id})                
        if(token)
        {
            await token.deleteOne()
        }        
        let resetToken = crypto.randomBytes(32).toString("hex");
        const hash = await bcrypt.hash(resetToken, 10);              
        await new Token({
          userId: user._id,
          token: hash,
          createdAt: Date.now(),
        }).save();
        const link = `${process.env.FRONTEND_ORIGIN}/passwordReset/${resetToken}/${user._id}`;
        await sendEmail(
          user.email,
          "Password Reset Request",
          {
            name: user.name,
            link: link,
          },
        );
        return {link:link,status:200};
    }
    catch(err)
    {
      return {status : 500 , error : err.message}
    }
}
  module.exports = {
    requestPasswordReset,
  };
