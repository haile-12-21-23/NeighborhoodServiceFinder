import asyncHandler  from 'express-async-handler';
import User from '../models/userModel.js';
import generatedToke from '../utils/generateToken.js';

// @desc Register a new user
// @route POST /api/users/register
// @access Public

const registerUser=asyncHandler(async (req,res)=>{
    const {firstName,lastName,email,phoneNumber,password,role}=req.body;

    const userExist=await User.findOne({email});

    if(userExist){
        res.status(400);
        throw new Error('User already exists!');

    }
    const user=await User.create({firstName,lastName,email,phoneNumber,password,role});

    if (user) {
        res.status(202).json({
            _id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            password:user.password,
            phoneNumber:user.phoneNumber,
            role:user.role,
            token:generatedToke(user._id)
        });
    }
    else{
        res.status(400);
        throw new Error('Invalid user data');
    }});

    // @desc Authenticate user & get token
// @route POST /api/users/login
// @access Public
const authUser =asyncHandler(async (req,res)=>{
    const {email,password}=req.body;

    const user= await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role
        });
    }
    else{
        res.status(401).
        json({error:'Invalid email or password!'});
    }
});
// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile=asyncHandler(async (req,res)=>{
    const user=await User.findById(req.user._id);

    if (user) {
         res.json({
            _id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role
        });
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});

export {registerUser, authUser,getUserProfile};