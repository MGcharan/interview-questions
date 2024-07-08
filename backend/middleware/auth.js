import jwt from 'jsonwebtoken';
import { getUserById } from '../controller/usercontrol.js';

// custom middleware

const isAuthorized=async(req,res,next)=>{
    let token;
    if(req.header){
        try{

            token =await req.headers["x-auth-token"];
            const decode=jwt.verify(token, process.env.SECRET_KEY);
            req.user=await getUserById(decode.id);
            next();
        }catch(err){
            console.log(err);
            res.status(500).json({err:"Internal server"});
        }
    }
};
export {isAuthorized}