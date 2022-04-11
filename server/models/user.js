const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,

    max: 50,
  },
  lastName: {
    type: String,
    required: true,

    max: 50,
  },
  userName: {
    type: String,
    required: true,

    max: 30,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: { 
    type: String,
    required: true,
  },
  profilePicUrl: {
    type: String,
    required: true,
  },
  famies: {
    type: Number,
    required: true,
  },
  famFriends:{
      type:Array,
      required:true
  },
  famRequestsReceived:{
      type:Array,
      requied:true
  },
  famRequestsSent:{
        type:Array,
        requied:true
  },
  firstSignUp:{
      type:Boolean,
      required:true
  },
  famiesDay:{
    type:Number,
    required:true
  },
  famTags:{
    type:Array,
    required:true
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
