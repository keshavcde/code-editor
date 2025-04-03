const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://codezepto:jwt@cluster1.ionmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1");
const signupSchema=new mongoose.Schema({
    username:{
        type:String,
        required: true,
        minLength:3,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        maxLength:40,
        trim:true
    },
    password:{
        type:String,
        required:true,
        maxLength:40,
        minLength:5,
        trim:true
    }
   
})
const signinSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        maxLength:40
    },
    password:{
        type:String,
        required:true,
        maxLength:40,
        minLength:5
    }
})
const Signup=mongoose.model("Signup",signupSchema);
const Signin=mongoose.model("Signin",signinSchema);
module.exports={
    Signup,
    Signin
}