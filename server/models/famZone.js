const mongoose = require("mongoose");

const FamZoneSchema = new mongoose.Schema({
    famZoneName:{
        type:String,
        required:true
    },
    famZoneMembers:{
        type:Array,
        required:true,
    },
    famZoneIcon:{
        type:String,
        required:true
    }
  
},
    {timestamps:true}
);

module.exports = mongoose.model("FamZone", FamZoneSchema);
