// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectdb from '../../../Components/connectdb';
import Users  from "../../../model/Users";
import cookie from "cookie";

// import User from "../../models/User";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
export default async function handler(req, res) {
  if(req.method==="POST"){
    try {
        await connectdb();
        const email = req.body.email;
        console.log(email);
        const user = await Users.findOne({email:email});
        
        if(!user){
            return res.json({success:false,message:"User doesn't exist"});
        }
        console.log(user)
        if(!user.password){
            return res.json({success:false,message:"Please set your password first,Alternate: Use Google Signin"});
        }
        const passwd = await bcrypt.compare(req.body.password,user.password);
        console.log("pas:"+passwd);
        if(!passwd){
            return res.json({success:false,message:"Please try with correct crediential"});
        }

        if(!user.verified){
            return res.json({success:false,message:"Please Verify your account first,Check your mail for verification"});
        }
        const data = {
            user:{
                id:user.id,
            }

        }

        const token = jwt.sign(data,process.env.SECRET_KEY);
        if(token){
            res.setHeader('Set-Cookie',cookie.serialize('AuthToken',token,{
                httpOnly:true,
                secure:process.env.NODE_ENV!=='development',
                sameSite:true,
                maxAge:3600,
                path:'/'
                
            }));
            res.json({success:true,message:"Logged in successfully"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Internal Server Error"});
    }
  }
}


