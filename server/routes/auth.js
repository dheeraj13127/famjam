const express=require('express')
const router=express.Router()
const {signInWithEmail,signUpWithEmail,googleLogin, googleSignUp}=require('../controls/auth')
router.post('/signUp',signUpWithEmail)
router.post('/signIn',signInWithEmail)
router.post('/googleSignIn',googleLogin)
router.post('/googleSignUp',googleSignUp)
module.exports=router