const userController=require('../bookSchema/userSchema')

const createUser=async function(req,res){
try{
let data=req.body
let {Name,email,password}=req.body
if(!data){
    return res.status(400).send({status:false,message:'dataRequired'})
}
if(!Name){
    return res.status(400).send({status:false,message:'NameRequired'})
}
if(!email){
    return res.status(400).send({status:false,message:'emailRequired'})
}if(!password){
    return res.status(400).send({status:false,message:'passwordRequired'})
}
let userData=await userController.create(data)
res.status(201).send({status:true,message:'userCreatedSuccessfully',data:userData})
}catch(err){
res.status(500).send({status:false,message:err.message})
}
}
//............................loginUser..............................
const login=async function(req,res){
    let data=req.body
    let {email,password}=req.body
    if(!email){
        return res.status(400).send({status:false,message:'NameRequired'})
    }
    if(!password){
        return res.status(400).send({status:false,message:'NameRequired'})
    }
    let loginUser=await userController.findOne({email})
    let loginUserId=loginUser._id
    let loginPassword=loginUser.password
    if(!(loginPassword==password)){
        res.status(400).send({status:false,message:'password mismatch'})
   }
    res.status(200).send({status:true,message:'loginSuccessfully',data:{userId:loginUserId}})
}
module.exports={ createUser,login}