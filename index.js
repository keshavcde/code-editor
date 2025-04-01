const express=require("express");
const app=express();
app.use(express.json());
const {signup}=require("./pages/signup");
const {signin}=require("./pages/signin");
app.use("/user",signup);
app.use("/user",signin);
app.listen(3000,()=>{
    console.log("the port is starting at 3000");
})