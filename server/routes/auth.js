const express=require('express') 
const router=express.Router()
const {signInWithEmail,signUpWithEmail,googleLogin,getProfile,googleSignUp, getFamFriends, updateFriendRequests,getFriendProfile, deleteFamFriendRequest, acceptFamFriendRequest, editUserProfile, updateFamies, updateFamiesDay}=require('../controls/auth')
const {chatConversation, getChatConversation}=require('../controls/conversation')
const { createMessage, getCreatedMessage } = require('../controls/message')
router.post('/signUp',signUpWithEmail)
router.post('/signIn',signInWithEmail)
router.post('/googleSignIn',googleLogin)
router.post('/googleSignUp',googleSignUp)
router.post('/getProfile',getProfile)
router.get('/getFamFriends/:userId',getFamFriends)
router.post('/updateFriendRequest',updateFriendRequests)
router.get('/getFriendProfile/:friendId',getFriendProfile)
router.post('/deleteFamFriendRequest',deleteFamFriendRequest)
router.post('/acceptFamFriendRequest',acceptFamFriendRequest)
router.put('/editUserProfile/:userId',editUserProfile)
router.put('/updateFamiesDay/:userId',updateFamiesDay)
router.put('/updateFamies/:userId',updateFamies)
router.post('/chatConversation',chatConversation)
router.get('/getChatConversation/:userId',getChatConversation)
router.post('/createMessage',createMessage)
router.get('/getCreatedMessage/:conversationId',getCreatedMessage)

module.exports=router   