const Conversation=require("../models/conversation")


exports.chatConversation=async(req,res)=>{
    const newConversation=new Conversation({
        members:[req.body.senderId,req.body.receiverId]
    })

    try{
        const savedConversation=await newConversation.save()
        res.status(200).json(savedConversation)
    }
    catch(err){
        res.status(500).json({message:"Something went wrong !"})
    }
}


exports.getChatConversation=async(req,res)=>{
    try{
        const conversation=await Conversation.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(conversation)
    }
    catch(err){
        res.status(500).json({message:"Something went wrong !"})
    }
}