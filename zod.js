const zod=require("zod");
const zodsignup=zod.object({
    username:zod.string(),
    email:zod.string().email(),
    password:zod.string()
})
const zodsignin=zod.object({
    email:zod.string().email(),
    password:zod.string()
})
module.exports={
    zodsignup,
    zodsignin
}