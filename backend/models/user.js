import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        maxlenght:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },

    password:{
        type:String,
        required:true,
        trim:true
    },

});

const userModel=mongoose.model("user",userSchema)
export{userModel}