const AsyncHandler = require('express-async-handler');
const Message = require('../../schema/MessageSchema')
const User = require('../../schema/userSchema')
const Chat = require('../../schema/ChatSchema')



const CreateMessage = AsyncHandler(async(req,res) => {
    
    if(!req.body.chatId || !req.body.content || !req.body.userId)
    {
        res.status(400).send("please give the validate Data")
        return
    }
    try
    {
        var message = await Message.create({
            content : req.body.content,
            sender : req.user._id,
            chat : req.body.chatId
        })
        message = await message.populate('sender','-tokens -followings -followers -password -pdfAccess ')
        message = await message.populate('chat')
        message = await User.populate(message,{
            path : 'chat.users',
            select:'name pic email'
        })
        await Chat.findByIdAndUpdate(req.body.chatId,{$set :{ latestMessage : message }})
        res.status(201).send(message)
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})

const GetChatMessages = AsyncHandler(async(req,res) => {
    if(!req.params.chatId)
    {
        res.status(400).send("Please Provide the All Details !")
        return 
    }

    try
    {
        const messages = await Message.find({chat:req.params.chatId}).populate('sender','name email pic _id').populate('chat')
        res.status(200).send(messages)
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})

module.exports = {CreateMessage,GetChatMessages};

