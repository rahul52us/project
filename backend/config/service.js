const Asynchandler = require('express-async-handler')
const JWT = require("jsonwebtoken");
const User = require('../schema/userSchema')
const sendEmail = require('./utils/sendEmail')
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Token = require('../schema/TokenSchema');
const requestPasswordReset = async (email) => {   
    if(!email)
    {        
        return "email does not exists"
    }
    try
    {
        const user  = await User.findOne({email : email})
        if(!user)
        {            
            return "user does not exits"
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

        const link = `${process.env.FRONTEND_ORIGIN}/passwordReset?token=${resetToken}&id=${user._id}`;

        await sendEmail(
          user.email,
          "Password Reset Request",
          {
            name: user.name,
            link: link,
          },
        );
        return link;
    }
    catch(err)
    {

    }
}

  const resetPassword = async (userId, token, password) => {
    let passwordResetToken = await Token.findOne({ userId });
  
    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
    }
  
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
  
    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }
  
    const hash = await bcrypt.hash(password, Number(bcryptSalt));
  
    await User.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );
  
    const user = await User.findById({ _id: userId });
  
    sendEmail(
      user.email,
      "Password Reset Successfully",
      {
        name: user.name,
      },
      "./template/resetPassword.handlebars"
    );
  
    await passwordResetToken.deleteOne();
  
    return true;
  };
  
  module.exports = {
    requestPasswordReset,
    resetPassword,
  };
