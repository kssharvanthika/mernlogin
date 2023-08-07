//const express=require("express");
//new js notation
//framework to craete api
import express from "express";
//allow to set up route to commication from frontend to backend
import cors from "cors";
import mongoose from 'mongoose';

import {userRouter} from "./routes/users.js";
//to generate version of api
const app=express()

app.use(express.json());//everything will create as json file middleware
app.use(cors());
app.use("/auth",userRouter);

mongoose.connect(
    "mongodb+srv://kssharvanthika123:sharvanthika123@recipes.ajrfzzg.mongodb.net/recipes?retryWrites=true&w=majority",
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
    );
  

app.listen(3001,()=>console.log("server started.."));
