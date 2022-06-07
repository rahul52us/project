const router = require('express').Router()
const protect = require('../config/protect')
const {CreateGroupChat, AddMemberToGroup, RemoveMemberFromGroup, DeleteGroup, RenameGroupName, FetchGroup , FetchGroupMembers} = require('../config/controller/ChatController')


router.post('/fetchGroup',[FetchGroup])
router.post('/fetchChatGroupMembers',[FetchGroupMembers])
router.post('/createGroupChat',[protect,CreateGroupChat])
router.put('/renameGroup',[protect,RenameGroupName])
router.put('/addMemberToGroup',[protect,AddMemberToGroup])
router.put('/removeMemberFromGroup',[protect,RemoveMemberFromGroup])
router.post('/deleteGroup',[protect,DeleteGroup])


module.exports = router;