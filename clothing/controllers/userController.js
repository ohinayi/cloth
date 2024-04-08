const Images = require("../model/adminModel");
const users = require("../model/userModel");
const userSaved = require("../model/userSavedItem");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();


//function that gets all clothes
const getClothes = async(req,res) => {
    const images = await Images.find();
    return res.status(200).json(images);
};

//function to create user
const createUser = async(req,res) => {
   const newUser = {
    name:req.body.name,
    email:req.body.email,
    password: await bcrypt.hash(req.body.password, 10), 
    address:req.body.address,

   };
    if(!newUser.name ||!newUser.email || !newUser.password ) {
       return res.status(400).json({"message":"input all fields as they are essential"});
    };
    const existingUser = await users.findOne({email:newUser.email});
    if(existingUser) {
        res.status(400).json({"message":"the email already exist"});
    }
    else{
        await users.create(newUser);
        const accessToken = jwt.sign({
            user:{
              email:newUser.email,
              id:newUser.id,
            },
          },process.env.ACCESS_TOKEN,
            {expiresIn:"2m"}
          );
      return  res.status(200).json({accessToken});
    };
};



//function to save a single item
const addToStore = async(req,res) => {
    const cloth = await Images.findById(req.body.id);
    if (!cloth){
        res.status(400).json({"message":"cloth dosent exist"});
    }else{
    const newItem = {
        name : cloth.name,
        image : cloth.image,
        size : cloth.size,
        type : cloth.type,
        cost : cloth.cost,
        user_id : req.user.id,
        email : req.user.email,
        address : req.user.address  
    };
    const addCloth = await userSaved.create(newItem);
    res.status(200).json(addCloth);
};
 };

 // function to remove item from store
 const removeFromStore = async(req,res) => {
    const checkCloth = await userSaved.findByIdAndDelete(req.body.id);
    if (checkCloth) {
        return res.status(200).json({"message":"deleted succesfully"}); 
    }
    else{
        return res.status(400).json({"message":"item does not exist or cant be found"});
    };
 };

 //function to login user
 const login = async (req,res) => {
   const {email,password} = req.body;
    if(!password || !email) {
         res.status(400).json({"message":"all fields are required"});
    };
    const User = await users.findOne({email});
    if (User && (await bcrypt.compare(password,User.password))){
        const accessToken = jwt.sign({
            user:{
                email:User.email,
                id:User.id, 
                address:User.address 
            },
        },process.env.ACCESS_TOKEN,
        {expiresIn:"20m"},
        );return res.status(200).json(accessToken);
        }else{
    return res.status(401).json({"message":"user not found"}); 
        };
 }

 // function to get all save item
 const store = async(req,res) => {
    const clothes = await userSaved.find({user_id:req.user.id});
    if(clothes){
        return res.status(200).json(clothes); 
    };
   return res.status(400).json({"message":"this item was not found in your store"});
 }

 const allStore = async(req,res) => {
    const clothes = await userSaved.find();
    if(clothes){
        return res.status(200).json(clothes); 
    };
   return res.status(400).json({"message":"no item was not found "});
 }

module.exports = {getClothes,createUser,addToStore,removeFromStore,login,store,allStore};