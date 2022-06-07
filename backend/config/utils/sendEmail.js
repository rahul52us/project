const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const dotenv = require('dotenv')
dotenv.config()

const sendEmail = async(email, subject, payload ) => {
  try {    
    const transporter = nodemailer.createTransport({
      service : 'gmail',
      port: 465,
      auth: {
        user: process.env.SENDER_EMAIL_USER,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      },
    });     
     const source = fs.readFileSync(path.join(__dirname,'template/requestResetPassword.handlebars'), "utf8");         
     const compiledTemplate = handlebars.compile(source);
    const options = {
        from: process.env.SENDER_EMAIL_USER,
        to: email,
        subject: subject,
        template: fs.readFileSync(path.join(__dirname,'template/requestResetPassword.handlebars'), "utf8"),
        html : compiledTemplate(payload),
        attachments: [{ filename: "another.jpg", path: path.join(__dirname,'template/another.jpg') }],              
    };
      transporter.sendMail(options, (error, info) => {
      if (error) {        
        return error;
      } else {        
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return error;
  }
};
module.exports = sendEmail;