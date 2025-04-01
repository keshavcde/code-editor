const express=require("express");
const signin=express.Router();
const {z}=require("zod");
const {Signup}=require("../db");
const {middle}=require("../middleware")
const zodsignup=z.object({
   
    email:z.string().email(),
   
})
signin.post("/signin",middle,async(req,res)=>{
    const body=req.body;
    const {email}=body;
    const {success}=zodsignup.safeParse(body);
    if(!success){
        return res.status(403).json({
            msg:"invalid inputs"
        })
    }
    const user=await Signup.findOne({
        email
    })
    
    if(!user){
        res.json({
            msg:"the user is not exists"
        })
    }else{
        res.json({
            msg:"user is already existed"
        })
    }
})

module.exports={
    signin
}