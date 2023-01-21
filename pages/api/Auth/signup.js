import connectdb from "../../../Components/connectdb";
import Users from "../../../model/Users";
import UserVerification from "../../../model/UserVerification";
import { v4 as uuidv4 } from "uuid";
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

transporter.verify((err, success) => {
  console.log(process.env.AUTH_PASSWORD);
  if (err) {
    console.log(err);
  } else {
    console.log("Ready for sending mails");
    // const mailOption = {
    //     from:process.env.AUTH_EMAIL,
    //     to:"technicalranjit@gmail.com",
    //     subject:"Verify Your mail",
    // }
  }
});

export default async function handle(req, res) {
  if (req.method === "POST") {
    try {
      await connectdb();
      const user = await Users.findOne({ email: req.body.email });
      if (!user) {
        bcrypt
          .hash(req.body.password, 10)
          .then((hashedPassword) => {
            Users.create({
              email: req.body.email,
              accessToken: "manually",
              profilePic: null,
              displayName: req.body.name,
              verified: false,
              createdAt: Date.now(),
              password: hashedPassword,
            })
              .then((data) => {
                // return res.json({sucess:true,message:"Created Sucessfully"})
                const { _id, email } = data;
                console.log(data);
                const uniqueString = uuidv4() + _id;
                bcrypt
                  .hash(uniqueString, 10)
                  .then((hashedString) => {
                    UserVerification.create({
                      userId: _id,
                      uniqueString: hashedString,
                      createdAt: Date.now(),
                      expiredAt: Date.now() + 21600000,
                    })
                      .then(() => {
                        const currentUrl = process.env.HOST;;
                        const mailOption = {
                          from: process.env.AUTH_EMAIL,
                          to: email,
                          subject: "Verify Your mail",
                          html: `<p>Click here to verify your mail </p><p><a href=${
                            currentUrl + "/verify/" + _id + "/" + uniqueString
                          }>Verify</a></p>`,
                        };

                        transporter
                          .sendMail(mailOption)
                          .then(() => {
                            return res.json({
                              sucess: true,
                              message:
                                "Account created sucessfully!! Please check your mail for verification!",
                            });
                          })
                          .catch((err) => {
                            console.log(err);
                            return res.json({
                              sucess: false,
                              message:
                                "Error occured while sending verification mail!!",
                            });
                          });
                      })
                      .catch((err) => {
                        console.log(err);
                        return res.json({
                          sucess: false,
                          message: "Error Occured! Please try later",
                        });
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    return res.json({
                      sucess: false,
                      message: "Error Occured! Please try later",
                    });
                  });
              })
              .catch((err) => {
                console.log(err);
                return res.json({
                  sucess: false,
                  message: "Something went wrong! Please try again later.",
                });
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return res.json({
          sucess: false,
          message: "Account Already Exist! Please Login",
        });
      }
    } catch (error) {
      console.log(error);
      return res.json({ sucess: false, message: "Internal Server Error" });
    }
  }
}
