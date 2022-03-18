const Message=require("../models/message")


exports.createMessage=async(req,res)=>{
    const newMessage=new Message(req.body)

    try{
        const savedMessage=await newMessage.save()
        res.status(200).json(savedMessage)
    }
    catch(err){
        res.status(500).json({message:"Something went wrong !"})
    }
}

exports.getCreatedMessage=async(req,res)=>{
  
    try{
        const messages=await Message.find({
            conversationId:req.params.conversationId
        })
        res.status(200).json(messages)
    }
    catch(err){
        res.status(500).json({message:"Something went wrong !"})
    }
}