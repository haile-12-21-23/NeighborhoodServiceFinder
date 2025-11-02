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

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);
export default User;