import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { usermodel } from '../models/users.js';

const router=express.Router()


router.post("/register",async(req,res)=>{
    const{username,password}=req.body;
    const user=await usermodel.findOne({username});

    if(user){
        return res.json({message:"user already exists!"});
    }
    const hashedpassword=await bcrypt.hash(password,10)
    const newUser=new usermodel({username,password:hashedpassword});
    await newUser.save();

    res.json({message:"user registered successfully"});

});
router.post("/login",async(req,res)=>{
    const{username,password}=req.body;
    const user=await usermodel.findOne({username});

    if(!user){
        return res.json({message:"user doesnt exixt !"});
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.json({message:"username or password is incorerect !"});
    }
    const token=jwt.sign({id:user._id},"secret");
    res.json({token,userID:user._id});
});







export{router as userRouter};