const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20");
const { default: Users } = require('../model/Users');
const { default: connectDB } = require('./connectdb');
const jwt = require("jsonwebtoken");
const { default: UserVerification } = require('../model/UserVerification');
require("dotenv").config();

const host = process.env.HOST;

passport.use(new GoogleStrategy({
    clientID:'654893194221-e9ptiasj6skd0o4r8kdge07t3k352n91.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: `${host}/api/redirect`,
    
},async(accessToken,refreshToken,profile,done)=>{
    try {
      await connectDB();
      if(!profile){
       return done(null,null,{message:"Not Authenticated"});
        
      }
        const emailId =await profile.emails[0];
        var validate;
       if(emailId){
        const index = emailId.value.indexOf("@");
         validate  = emailId.value.slice(index);
       }
       if(validate!=="@kiit.ac.in"){
          return done(null,null,{message:"Please signin with kiit mail id only;"});
       }

       console.log("this executed");

        const user =await Users.findOne({email:emailId.value});
        const pic = await profile.photos[0];
        if(!user){
            Users.create({
                email:emailId.value,
                verified:true,
                accessToken:accessToken,
                displayName:profile.displayName,
                profilePic:pic.value,
                createdAt: Date.now(),
                password:null,

            }).then(async(users)=>{
                const u = {
                  user:{
                    id:users._id,
                  }
                };
                const token =  jwt.sign(u,"PandaSecurity");
              return  done(null,users,{message:"Signup Sucessfully",token,profile});
            }).catch((err)=>{
                console.log(err);
              return  done(err,null,{message:"something went wrong!"});
            })
        }else{

          if(!user.verified){
            const up = await Users.updateOne({_id:user.id},{$set:{verified:true}});
            if(up.modifiedCount>0){
              console.log("User is Verified");
              UserVerification.findOneAndDelete({userId:user.id}).catch((err)=>{console.log(err)});
            }else{
              console.log("User is Not Verified");
            }
          }

          const u = {
            user:{
              id:user._id,
            }
          };
            console.log("userl",user);
            const token = jwt.sign(u,"PandaSecurity");
            return done(null,user,{message:"Auth Sucessfull",token,profile});
        }
   } catch (error) {
    console.log(error)
    return done(error,null,{message:"Internal Server Error!"});
   }

}))



