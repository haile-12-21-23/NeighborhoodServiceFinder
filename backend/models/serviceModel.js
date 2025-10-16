
import mongoose from "mongoose";

const serviceSchema=mongoose.Schema({
    provider:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    category:{type:String, required:true},
    serviceName:{type:String, required:true},
    description:{type:String, required:true},
    phone:{type:String, required:true},
    location:{type:String, required:true},
    rating:{type:Number,default:0},
    images:[{type:String, }],
   createdAt:{type:Date,default:Date.now},
   updatedAt:{type:Date,default:Date.now},
}, {timestamps:true});


export default mongoose.model('Service',serviceSchema);