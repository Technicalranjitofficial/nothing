import connectdb from "../../../Components/connectdb";
import Users from "../../../model/Users";
import UserVerification from "../../../model/UserVerification";

require("dotenv").config();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

// router.get("/verify/:userId/:uniqueString",

export default async function handler(req, res) {
  try {
    await connectdb();
    const { userId, uniqueString } = req.query;
    UserVerification.find({ userId })
      .then(async (result) => {
        if (result.length > 0) {
          var data = result[0];
          console.log("data:", data.createdAt);
          console.log(uniqueString);
          console.log("database:" + data.uniqueString);

          bcrypt
            .compare(uniqueString, data.uniqueString)
            .then(async (result) => {
              if (result) {
                console.log("result", result);
                if (data.expiredAt < Date.now()) {
                  UserVerification.deleteOne({ userId })
                    .then(() => {
                      Users.deleteOne({ userId })
                        .then(() => {
                          let message =
                            "Your verification code has been expired.You can signup again";
                          res.json({ message: message });
                        })
                        .catch((error) => {
                          console.log(error);
                          res.json({
                            message: "Error occured while deleting Users",
                          });
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                      res.json({
                        message:
                          "Error occured while deleting verification data",
                      });
                    });
                } else {
                  const up = await Users.updateOne(
                    { _id: userId },
                    { $set: { verified: true } }
                  );
                  if (up.modifiedCount > 0) {
                    let message = "Your Email has been verified,Please login";
                    UserVerification.deleteOne({ userId })
                      .then(() => {
                        const data = {
                          user: {
                            id: userId,
                          },
                        };

                        const token = jwt.sign(data, process.env.SECRET_KEY);

                        res.json({sucess:true, message: message, AuthToken: token });
                      })
                      .catch((err) => {
                        console.log(err);
                        res.json({sucess:false,
                          message:
                            "Error occured while deleting verification data",
                        });
                      });

                    // })
                    // .catch((error) => {
                    //   console.log(error);
                    //   res.json({
                    //     message: "Error occured while Updating your account",
                    //   });
                    // });
                  } else {
                    res.json({sucess:false,
                      message: "Something went wrong! Please try again!!",
                    });
                  }
                }
              } else {
                return res.json({
                  sucess:false,
                  message:
                    "Wrong verification code,Please try with original one or sign up again",
                });
              }
            })
            .catch((error) => {
              console.log(error);
              res.json({sucess:false,
                message:
                  "Error occured while verifying your email,Please try again later ",
              });
            });
        } else {
          res.json({sucess:false,
            message: "User has been already verified or doesn't Exist",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(400)
          .json({sucess:false, message: "Error Occured while verifying your email" });
      });
  } catch (error) {
    console.log(error);
  }
}
