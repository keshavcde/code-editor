const express=require("express");
const {Signup}=require("../db");
const {z}=require("zod");
const jwt=require("jsonwebtoken")
const signup=express.Router();
const zodsignup=z.object({
    username:z.string(),
    email:z.string().email(),
    password:z.string()
})

signup.post("/signup",async (req,res)=>{
    const body=req.body;
    const {username,email,password}=body;
    const result=zodsignup.safeParse(body);
    if(!result.success){
        return res.status(403).json({
            msg:"invalid error"
        })
    }
    // put in the mongodb
    const user=await Signup.create({
       username,
       email,
       password
    })
    
    
    const token=jwt.sign({
        email
    },"keshav");
    res.json({
        msg:"user is succesfully created",
        token:token
    })
})

module.exports={
    signup
}