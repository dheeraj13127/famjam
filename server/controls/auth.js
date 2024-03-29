const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
require("dotenv").config();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

exports.googleSignUp = async (req, res) => {
  const { tokenId } = req.body;
  await client
    .verifyIdToken({
      idToken: tokenId,
      requiredAudience: process.env.GOOGLE_CLIENT_ID,
    })
    .then((resp) => {
      const {
        email_verified,
        name,
        email,
        given_name,
        family_name,
        iat,
        picture,
      } = resp.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            return res.status(400).json({ message: "Something went wrong !" });
          } else {
            if (user) {
              const token = jwt.sign(
                { _id: user._id },
                process.env.JWT_SIGNIN_KEY,
                { expiresIn: "31556926" }
              );
              const { _id, userName, email, firstName, lastName } = user;
              return res.status(400).json({
                message: "Email address already exists",
              });
            } else {
              let day=new Date().getDay()
              let password = iat + email + process.env.JWT_SIGNIN_KEY;
              let newUser = new User({
                firstName: given_name,
                lastName: family_name,
                userName: given_name + family_name,
                email,
                password,
                profilePicUrl:
                  "https://imgs.search.brave.com/0EITIdJcbvNG-q0alVrRPR9t-DpgY0hvtFvcdNO34sg/rs:fit:452:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5P/bG54Tzc1M1ZSZ0hL/RExMRHpDS29BSGFI/dyZwaWQ9QXBp",
                famies: 0,
                famFriends: [],
                famRequestsReceived: [],
                famRequestsSent: [],
                firstSignUp: false,
                famiesDay:day,
                famTags:[],
                famZones:[]
              });
              newUser.save((err, data) => {
                if (err) {
                  return res
                    .status(400)
                    .json({ message: "Something went wrong!", err });
                } else {
                  const token = jwt.sign(
                    { _id: data._id },
                    process.env.JWT_SIGNIN_KEY,
                    { expiresIn: "365d" }
                  );
                  const { _id, userName, email, firstName, lastName } = newUser;

                  res.json({
                    token,
                    user: { _id, userName, email, firstName, lastName },
                    message: "Success",
                  });
                }
              });
            }
          }
        });
      }
    });
};
exports.googleLogin = async (req, res) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      requiredAudience: process.env.GOOGLE_CLIENT_ID,
    })
    .then((resp) => {
      const { email_verified, name, email, given_name, family_name, iat } =
        resp.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            return res.status(400).json({ message: "Email not registered!" });
          } else {
            if (user) {
              const token = jwt.sign(
                { _id: user._id },
                process.env.JWT_SIGNIN_KEY,
                { expiresIn: "31556926" }
              );
              const { _id, userName, email, firstName, lastName } = user;
              res.json({
                token,
                user: { _id, userName, email, firstName, lastName },
                message: "welcome back !",
              });
            } else {
              return res.status(400).json({ message: "Email not registered!" });
            }
          }
        });
      }
    });
};

exports.signUpWithEmail = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array() });
    }

    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res.status(400).json({
          success: false,
          message: "Email address already exists",
        });
      }
    });

    var hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const newUser = await User.create(req.body);
    const token = jwt.sign(newUser.toJSON(), process.env.JWT_SIGNIN_KEY, {
      expiresIn: "30d",
    });
    return res.status(200).json({
      success: true,
      user: newUser,
      accessToken: token,
      message: "Success",
    });
  } catch (e) {
    res.status(500).json({ success: false, message: "Something went wrong !" });
  }
};

exports.signInWithEmail = async (req, res) => {
  try {
    const emailAddress = req.body.email;
    const password = req.body.password;

    const isEmailPresent = await User.findOne({ email: emailAddress });
    if (!isEmailPresent) {
      return res
        .status(400)
        .json({ success: false, message: "No such email address found." });
    }

    if (!bcrypt.compareSync(password, isEmailPresent.password)) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }
    const token = jwt.sign(
      isEmailPresent.toJSON(),
      process.env.JWT_SIGNIN_KEY,
      { expiresIn: "30d" }
    );
    return res
      .status(200)
      .json({ success: true, accessToken: token, message: "Welcome back !" });
  } catch (e) {
    // res.status(500).json({ success: false, message: "Something went wrong !" });
  }
};

exports.getProfile = async (req, res) => {
  const { userId } = req.body;

  try {
    await User.findById({ _id: userId }).then((resp) =>
      res.status(200).json({ user: resp })
    );
  } catch (e) {
    res.status(500).json({ success: false, message: "Something went wrong !" });
  }
};

exports.getFamFriends = async (req, res) => {
  try {
    const friends = await User.find({
      famFriends: { _id: req.params.userId },
    });
    res.status(200).json(friends);
  } catch (e) {
    res.status(500).json({ success: false, message: "Something went wrong !" });
  }
};
exports.getFriendProfile = async (req, res) => {
 

  try {
    await User.findById({ _id: req.params.friendId }).then((resp) =>
      res.status(200).json({ user: resp })
    );
  } catch (e) {
    res.status(500).json({ success: false, message: "Something went wrong !" });
  }
};

exports.updateFriendRequests=async(req,res)=>{
 
  try{
    await User.findOneAndUpdate({_id:req.body.friendId},{
      $push:{
        famRequestsReceived:req.body.newUserData
      }
    },{upsert:true,returnDocument:true},(err,result)=>{
      if(err){
        return res.status(400).json(err)
      
      }
      else{
       return res.status(200).json(result)
      }
    })
    
  }
  catch(e){
    // res.status(500).json({ success: false, message: "Something went wrong !" });
  }
}


exports.deleteFamFriendRequest=async(req,res)=>{
  try{
      await User.findOneAndUpdate({_id:req.body.userId},{
        $pull:{
          famRequestsReceived:{_id:req.body.friendId}
        }
      },(err,result)=>{
        if(err){
          return res.status(400).json(err)
        }
        else{
          return res.status(200).json(result)
        }
          
      })
  }
  catch(e){

  }
}

exports.acceptFamFriendRequest=async(req,res)=>{

  try{
    await User.findOneAndUpdate({_id:req.body.userId},{
      $push:{
        famFriends:{_id:req.body.friendId}
      }
    },{upsert:true,returnDocument:true},(err,result)=>{
      if(err){
        // return res.status(400).json(err)
      }
      else{
        // return res.status(200).json(result)
         User.findOneAndUpdate({_id:req.body.friendId},{
          $push:{
            famFriends:{_id:req.body.userId}
          }
        },{upsert:true,returnDocument:true},(err,result)=>{
          if(err){
            // return res.status(400).json(err)
          }
          else{
             User.findOneAndUpdate({_id:req.body.userId},{
              $pull:{
                famRequestsReceived:{_id:req.body.friendId}
              } 
            },(err,result)=>{
              if(err){
                return res.status(400).json(err)
              }
              else{
                return res.status(200).json(result)
              }
                
            })
          }
            
        })
      }
        
    })
    
}
catch(e){

}
}

exports.editUserProfile=async(req,res)=>{
  try{
    await User.findOneAndUpdate({_id:req.params.userId},{
      
        userName:req.body.userName,
        profilePicUrl:req.body.profilePicUrl
    },{returnDocument:true,new:true},(err,result)=>{
      if(err){
        return res.status(400).json(err)
      
      }
      else{
       return res.status(200).json(result)
      }
    })
    
  }
  catch(e){
    // res.status(500).json({ success: false, message: "Something went wrong !" });
  }
}
exports.editUserProfile=async(req,res)=>{
  try{
    await User.findOneAndUpdate({_id:req.params.userId},{
      
        userName:req.body.userName,
        profilePicUrl:req.body.profilePicUrl
    },{returnDocument:true,new:true},(err,result)=>{
      if(err){
        return res.status(400).json(err)
      
      }
      else{
       return res.status(200).json(result)
      }
    })
    
  }
  catch(e){
    // res.status(500).json({ success: false, message: "Something went wrong !" });
  }
}

exports.updateFamies=async(req,res)=>{
  try{
    await User.findOneAndUpdate({_id:req.params.userId},{
      famies:req.body.newFamies
        
    },{returnDocument:true,new:true},(err,result)=>{
      if(err){
        return res.status(400).json(err)
      
      }
      else{
       return res.status(200).json(result)
      }
    })
    
  }
  catch(e){
    // res.status(500).json({ success: false, message: "Something went wrong !" });
  }
}
exports.updateFamiesDay=async(req,res)=>{
  try{
    await User.findOneAndUpdate({_id:req.params.userId},{
      famiesDay:req.body.newDay
        
    },{returnDocument:true,new:true},(err,result)=>{
      if(err){
        return res.status(400).json(err)
      
      }
      else{
       return res.status(200).json(result)
      }
    })
    
  }
  catch(e){
    // res.status(500).json({ success: false, message: "Something went wrong !" });
  }
}

exports.updateFamTags=async(req,res)=>{
 
  try{
    await User.findOneAndUpdate({_id:req.params.userId},{
      $push:{
        famTags:req.body.rdData
      }
    },{upsert:true,returnDocument:true,new:true},(err,result)=>{
      if(err){
        return res.status(400).json(err)
      
      }
      else{
       return res.status(200).json(result)
      }
    })
    
  }
  catch(e){
    // res.status(500).json({ success: false, message: "Something went wrong !" });
  }
}
