const FamZone=require('../models/famZone')


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