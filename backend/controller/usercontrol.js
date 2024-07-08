import { request } from "express";

import jwt from "jsonwebtoken"
import { userModel } from "../models/user.js";


export function getUserByEmail(request){
   return userModel.findOne({
     email:request.body.email,
   })
}
export function getUserById(id) {
  return userModel.findById(id).select("_id username email");
}

export function generateToken(id){
    return jwt.sign({id},process.env.SECRET_KEY)
}