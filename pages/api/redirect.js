

const passport = require("passport");
import { setCookie } from "cookies-next";
import "../../Components/passports";
import cookie from "cookie"
export default async function(req,res,next){
    passport.authenticate("google",(err,user,info)=>{
     if(err){
       return res.send(err);
     }
     if(!user){ 
       return res.send(info);
    }
    res.setHeader('Set-Cookie',cookie.serialize('AuthToken',info.token,{
      httpOnly:true,
      secure:process.env.NODE_ENV!=='development',
      sameSite:true,
      maxAge:3600,
      path:'/'
      
  }));
    return res.redirect("/");
  
    
    
    })(req, res, next);
}