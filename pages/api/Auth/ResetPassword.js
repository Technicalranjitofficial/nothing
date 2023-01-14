// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectdb from "Components/connectdb";
import ResetPassword from "model/ResetPassword";
import Users from "model/Users";

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
require("dotenv").config();

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      await connectdb();
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.AUTH_EMAIL,
          pass: process.env.AUTH_PASSWORD,
        },
      });
      const email = req.body.email;
      const user = await Users.findOne({ email: email });
      if (!user) {
        return res.json({sucess:false, message: "Email not found" });
      }
      if (!user.verified) {
        return res
          .json({sucess:false, message: "Please Verify your email first,check your mail" });
      }

      const existingVerification = await ResetPassword.findOne({userId:user.id});
      if(existingVerification){
        ResetPassword.findOneAndDelete({userId:user.id}).then(()=>{
         console.log("Deleted Oldone");
        }).catch((err)=>{
          console.log(err);
          return res.json({success:false,message:"Something went wrong!"});
        })
      }
      
      const uniqueString = uuidv4() + user.id;
      const currentUrl = process.env.HOST;
      const mailOption = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Reset Your Password",
        html: `<p>Click here to Reset your password </p><p><a href=${
          currentUrl + "/passwordreset/" + user.id + "/" + uniqueString
        }>Reset</a></p>`,
      };

      bcrypt
        .hash(uniqueString, 10)
        .then(async (hashedString) => {
          ResetPassword.create({
            userId: user.id,
            uniqueString: hashedString,
            createdAt: Date.now(),
            expiredAt: Date.now() + 21600000,
          })
            .then(() => {
              transporter.sendMail(mailOption).then(() => {
                res.json({success:true,
                  message:
                    "Password Reset Link has been sent sucessfully to your mail",
                });
              });
            })
            .catch((error) => {
              console.log(error);
              return res.json({
                success:false,
                message: "Error occured while sending reset mail",
              });
            });
        })
        .catch((error) => {
          console.log(error);
          return res.json({
            success:false,
            message: "Error occured while hasing ",
          });
        });
    } catch (error) {
      console.log(error);
      res.json({
        success:false,
        message: "Something went wrong!!",
      });
    }
  }
}


