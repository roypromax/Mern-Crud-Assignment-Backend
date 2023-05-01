const express = require("express");

const {userRoute} = require("./routes/user.route");

const {connection} = require("./configs/db.js");

const {UserModel} = require("./models/user.model.js");

const {noteRoute} = require("./routes/note.route.js");

const {authenticate} = require("./middlewares/authenticate.middleware");

require('dotenv').config();

const app = express();

const jwt = require("jsonwebtoken");

app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Homepage");
})


app.use("/user",userRoute);

app.use(authenticate);

app.use("/notes",noteRoute);

app.get("/data",authenticate,(req,res)=>{
    res.send("Protected data");
})




app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("Connected to Database");
    }catch(error){
        console.log("Error connecting to Database");
        console.log(error.message);
    }
    console.log(`Server is running at port ${process.env.port}`);
})