const jwt=require("jsonwebtoken");
const password="keshav";
const middle=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ msg: "Invalid or missing token" });
    }
   const token=authHeader.split(" ")[1];
   try{
    const decoded=jwt.verify(token,password);
    next();
   }catch{
    res.json({
        msg:"invalid token"
    })
   }
}
module.exports={
    middle
}