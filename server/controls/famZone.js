const FamZone=require('../models/famZone')
const User = require("../models/user");

exports.createFamZone=async(req,res)=>{
    const newFamZone=new FamZone(req.body)

    try{
        const savedFamZone=await newFamZone.save()
        res.status(200).json(savedFamZone)
    }
    catch(err){
        res.status(500).json({message:"Something went wrong !"})
    }
}


exports.updateFamZoneDetailsInUsers=async(req,res)=>{

    try{
        
             await User.findOneAndUpdate({_id:req.body.createdFamZoneData.famZoneMembers[0]},{
                  $push:{
                      famZones:{_id:req.body.createdFamZoneData._id}
                  }
              },{upsert:true,returnDocument:true},(err,result1)=>{
                  if(err){

                  }
                  else{
                      User.findOneAndUpdate({_id:req.body.createdFamZoneData.famZoneMembers[1]},{
                        $push:{
                            famZones:{_id:req.body.createdFamZoneData._id}
                        }
                      },{upsert:true,returnDocument:true},(err,result2)=>{
                          if(err){

                          }
                          else{
                              User.findOneAndUpdate({_id:req.body.createdFamZoneData.famZoneMembers[2]},{
                                $push:{
                                    famZones:{_id:req.body.createdFamZoneData._id}
                                }
                              },{upsert:true,returnDocument:true},(err,result3)=>{
                                  if(err){

                                  }
                                  else{
                                      User.findOneAndUpdate({_id:req.body.createdFamZoneData.famZoneMembers[3]},{
                                        $push:{
                                            famZones:{_id:req.body.createdFamZoneData._id}
                                        }
                                      },{upsert:true,returnDocument:true},(err,result3)=>{
                                          if(err){
                                            return res.status(400).json(err)
                                          }
                                          else{
                                            return res.status(200).json(result3)
                                          }
                                      })
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

exports.getFamZones=async(req,res)=>{
    try{
    
        const famZone=await FamZone.find({
            famZoneMembers:{$in:[req.params.userId]}
        })
        res.status(200).json(famZone)
    }
    catch(e){
        res.status(500).json({message:"Something went wrong !"})
    }
}

exports.getIndividualFamZone=async(req,res)=>{
    try{
        const individualFamZone=await FamZone.find({
            _id:req.params.famZoneId
        })
        res.status(200).json(individualFamZone)
    }
    catch(e){
        res.status(500).json({message:"Something went wrong !"})
    }
}

exports.getParticularFamZoneMembers=async(req,res)=>{
    try{
            const particularFamZoneMembers=await User.find({
                famZones:{_id:req.params.famZoneId}
            })
            res.status(200).json(particularFamZoneMembers)
    }
    catch(e){
        res.status(500).json({message:"Something went wrong !"})
    }
}