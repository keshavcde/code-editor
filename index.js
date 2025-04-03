const express=require("express");
const cors=require("cors");
const app=express();
app.use(cors());
app.use(express.json());
const {signup}=require("./pages/signup");
const {signin}=require("./pages/signin");
const {airouter}=require("./pages/ai")
app.use("/user",signup);
app.use("/user",signin);
app.use("/generate",airouter);
app.listen(3000,()=>{
    console.log("the port is starting at 3000");
})