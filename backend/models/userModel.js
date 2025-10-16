import mongoose  from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema= mongoose.Schema({
    firstName:{type:String,required:true,},
    lastName:{type:String,required:true,},
    email:{type:String, required:true, unique:true,},
    phoneNumber:{type:String,required:true, unique:true,},
    password:{type:String,required:true,},
    role:{type:String, enum:['user','provider','admin',],default:'user'},
createdAt:{type:Date,default:Date.now},
updatedAt:{type:Date,default:Date.now},
}, {timestamps:true});

userSchema.methods.matchPassword=async function(hashedPassword){
    return  await bcrypt.compare(hashedPassword,this.password);
};

userSchema.pre('save',async function(next){
    if (!this.isModified('password'))  {
        return next();
    }
    const salt =await bcrypt.genSalt(10);
    this.password=bcrypt.hash(this.password, salt);
});
export default mongoose.model('User',userSchema);