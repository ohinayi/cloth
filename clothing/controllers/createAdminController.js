const admins = require("../model/createAdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const create = async(req,res) => {
    const newAdmin = {
        name:req.body.name,
        email:req.body.email,
        password:await bcrypt.hash(req.body.password,10)
    };
    if(!newAdmin.email || !newAdmin.name || !newAdmin.password){
       return res.status(400).json({"message":"all fields are required"});
    };
    const exist = await admins.findOne({email:newAdmin.email});
    if (exist) {
      return  res.status(400).json({"message":"email already in use"});
    }else{
    const user= await admins.create(newAdmin);
    const accessToken = jwt.sign({
        user:{
            email:newAdmin.email,
            id:newAdmin.id  
        },
    },process.env.ACCESS_TOKEN,
    {expiresIn:"20m"},
    ); return res.status(200).json(accessToken);
    };
};

const viewAdmin = async(req,res) => {
    const admin = await admins.find();
   return res.status(200).json(admin);
}

const update = async(req,res) => {
    const exist = await admins.findById(req.body.id);
    if(!exist){
       return res.status(400).json({"message":"admin does not exist"});
    };
    const updatedContact = await admins.findByIdAndUpdate(
        req.body.id,
        req.body,
        {new:true}
    );
    return res.status(200).json(updatedContact);
} 

const deleteAdmin = async(req,res) => {
    const exist = await admins.findById(req.body.id);
    if(!exist){
      return  res.status(400).json({"message":"admin does not exist"});
    };
    await admins.findByIdAndDelete(req.body.id);
    return res.status(200).json({"message":"admin deleted successfully"});
}

const login = async(req,res) => {
    const{email,password} = req.body;
    if(!password || !email) {
       return res.status(400).json({"message":"all fields are required"});
   };
   const admin = await admins.findOne({email});
   if (admin && await bcrypt.compare(password,admin.password)){
       const accessToken = jwt.sign({
           user:{
               email:admin.email,
               id:admin.id  
           },
       },process.env.ACCESS_TOKEN,
       {expiresIn:"2m"},
       );
       return res.status(200).json(accessToken);
    };
      return res.status(401).json({"message":"admin not found"}); 

}

module.exports = {login,deleteAdmin,create,update,viewAdmin};