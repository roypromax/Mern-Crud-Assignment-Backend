const express = require("express");

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const {UserModel} = require("../models/user.model");

const userRoute = express.Router();

userRoute.post("/register",(req,res)=>{
    const {pass} = req.body;
    try {
        bcrypt.hash(pass, 5, async(err, hash)=>{
            const newUser = new UserModel({...req.body,pass:hash});
            await newUser.save();
            res.status(200).send({msg:"New user has been registerd"}).json();
        });
    } catch (error) {
        res.status(400).send({err:"error"}).json();
    }
})

userRoute.post("/login",async(req,res)=>{
    const {email,pass} = req.body;

    try {
        const user = await UserModel.findOne({email:email});
        if(user){
            bcrypt.compare(pass, user.pass, (err, result)=>{
                if(result){
                    // console.log(user);
                    const token = jwt.sign({authorID:user._id,author:user.name}, 'masai');
                    res.status(200).send({msg:"Login successful",token:token}).json();
                }else{
                    res.status(400).send({err:"Wrong Credentials"}).json();
                }
            });
        }else{
            res.status(400).send({err:"Wrong Credentials"}).json();
        }
    } catch (error) {
        res.status(400).send({err:error}).json();
    }
})





module.exports = {userRoute};