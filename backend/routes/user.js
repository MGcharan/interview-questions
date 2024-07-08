import express from "express";
import bcrypt from 'bcrypt';
import { generateToken, getUserByEmail } from "../controller/usercontrol.js";
import { userModel } from "../models/user.js";


const router =express.Router();

// login
router.post("/login", async (req,res)=>{
    try{
        const user=await getUserByEmail(req);
        if(!user){
            return res.status(400).json({error:"Invalid authorization"});
        }
        // validate password
        const validatePassword=await bcrypt.compare(req.body.password,user.password);
        if(!validatePassword){
            return res.status(400).json({error:"Invalid authorization"})
        }
        // generate password

        const token=generateToken(user._id);
        res.status(201).json({message:"Logged in",token})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal error"})
    }

});

// signup
router.post("/signup",async (req,res)=>{
    try{
        let user = await getUserByEmail(req)
        // if user have account
        if(user){
            return res.status(400).json({error:"user already exists"})
        }
        // generate the hashed password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt)
        user=await new userModel({
            ...req.body,password:hashedPassword
        }).save()
        // generate token give response
       const token =generateToken(user._id)
        res.status(201).json({
            message:"successfully Register",
            token,
        });
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal error"})
    }
})
export const userRouter = router;