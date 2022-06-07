const AsyncHandler = require('express-async-handler');
const { runSaga } = require('redux-saga');
const Chat = require('../../schema/ChatSchema');
const User = require('../../schema/userSchema')


const FetchGroupMembers = AsyncHandler(async(req,res)=>{

    if(!req.body.chatId || !req.body.page)
    {
        res.status(400).send("Please Provide the All Fields !!")
        return
    }
    try
    {
        var chatId = Chat.findById(req.body.chatId)
        if(chatId)
        {
            const chats = await Chat.findById(req.body.chatId).populate('users','-password')            
            res.status(200).send(chats.users)           
        }
        else
        {
            res.status(400).send("this chat does not exists !")
        }        
    }    
    catch(err)
    {
        console.log(err.message)
        res.status(500).send(err.message)
    }
})
const FetchGroup = AsyncHandler(async(req,res) => {
    try
    {
        const chats = await Chat.find().limit(10)
        .populate('groupAdmin','-password -tokens -pdfAccess -createdAt -updatedAt')
        .populate('latestMessage')        
        User.populate(chats,{
            path : 'latestMessage.sender',
            select : '-password -tokens'                                                                          
        }).then((result)=>{
            res.status(200).send(result)
        }).catch((err)=>{
            res.status(422).json(err.message)
        })
    }
    catch(err)
    {
        res.status(422).send(err.message)
    }
})
const CreateGroupChat = AsyncHandler(async(req,res) => {

    if(!req.body.name)
    {
        res.status(400).send("Please Provide the all fields")
        return 
    }
    try
    {
        const createdGroup = await Chat.create({
            chatName : req.body.name,
            users : [req.user._id],
            isGroupChat : true,
            groupAdmin : req.user._id
        })
        if(createdGroup)
        {
            const createdChatGroup = await Chat.findOne({ _id : createdGroup._id})            
            .populate('groupAdmin','-password -tokens')
            res.status(200).send(createdChatGroup)
        }
        else
        {
            res.status(422).send("Something went wrong , while creating  new Group Please try again later !")
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send(err.message)
    }
})
const RenameGroupName = AsyncHandler(async(req,res) => {    

    const {chatId,GroupName} = req.body;
    if(!chatId || !GroupName)
    {
        res.status(400).send("Please send the all the fields")
        return 
    }
    try
    {
        const updatedGroup = await Chat.findByIdAndUpdate(chatId, {chatName : GroupName },{ new : true }).populate('users','-password -tokens -pdfAccess -createdAt -updatedAt')        
        res.status(200).json(updatedGroup)
    }
    catch(err)
    {
        res.status(500).json(err.message)
    }
})
const DeleteGroup = AsyncHandler(async(req,res) => {
    const {chatId} = req.body;
    try
    {
        const deletedGroup = await Chat.findByIdAndDelete(chatId)
        res.status(200).send(deletedGroup)
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})
const  AddMemberToGroup = AsyncHandler(async(req,res)=>{
    
    if(!req.body.chatId || !req.body.newUserToAdd)
    {
        res.status(400).send("Please Provide the All Datas To Verify !")
        return
    }
    try
    {
        const chats = await Chat.findOne({_id:req.body.chatId})        
        if(chats)
        {
            if(chats.users.includes(req.body.newUserToAdd))
            {
                res.status(400).send(`this user is already exists in this ${chats.chatName} group !`)
                return
            }
            else
            {                
                const user = await User.findOne({_id:req.body.newUserToAdd}).select('-password -tokens -pdfAccess -createdAt -updatedAt')                
                console.log(user)
                if(user)
                {
                const updatedGroup  = await Chat.findByIdAndUpdate(req.body.chatId,{$push : {  users : req.body.newUserToAdd }},{new : true })
                if(updatedGroup)
                {
                    res.status(200).send({user:user,groupId:updatedGroup._id,groupName:updatedGroup.chatName})    
                }
                else
                {
                    res.status(400).send("can't add user to this group")
                }
                }                
                else
                {
                    res.status(400).send("this user does not exists !")
                }                
            }
        }  
        else      
        {
            res.status(400).send("this group does not exist, either try again later")
        }
    }
    catch(err)
    {
        // console.log(err.message)
        res.status(500).send(err.message)
    }
})
const RemoveMemberFromGroup = AsyncHandler(async(req,res)=>{

    if(!req.body.chatId || !req.body.userToRemove)
    {
        res.status(400).send("Please Provide the All Fields !")
        return 
    }
    try
    {
        const groupChat = await Chat.findOne({_id:req.body.chatId,isGroupChat:true})
        if(groupChat)
        {
            if(!groupChat.users.includes(req.body.userToRemove))
            {
                res.status(400).send(`this user does not exists in this ${groupChat.chatName} group`)
            }
          const updatedGroup  = await Chat.findByIdAndUpdate(req.body.chatId,{ $pull : { users : req.body.userToRemove }},{new : true })
          res.status(200).send({GroupId : updatedGroup._id,groupName : updatedGroup.chatName , userId : req.body.userToRemove})
        }
        else
        {
            res.status(400).send('This group does not exists , either something went wrong !')
        }
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})
module.exports = {FetchGroup,FetchGroupMembers,CreateGroupChat,RenameGroupName,RemoveMemberFromGroup,AddMemberToGroup,DeleteGroup}