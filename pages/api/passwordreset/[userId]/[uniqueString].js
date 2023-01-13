import connectdb from "Components/connectdb";
import ResetPassword from "model/ResetPassword";
import bcrypt from "bcrypt";
import Users from "model/Users";



export default async function handler(req,res){
    try {
        await connectdb();
        if (req.method == "POST") {
          const { userId, uniqueString } = req.query;
          console.log(userId,uniqueString);
          ResetPassword.find({ userId })
            .then(async (result) => {
              if (result.length > 0) {
                var data = result[0];
                console.log("data:", data.createdAt);
                console.log(uniqueString);
                console.log("database:" + data.uniqueString);
    
                bcrypt
                  .compare(uniqueString, data.uniqueString)
                  .then(async (result) => {
                    console.log(result);
                    if (result) {
                      console.log("result", result);
                      if (data.expiredAt < Date.now()) {
                        ResetPassword.deleteOne({ userId })
                          .then(() => {
                            res.json({success:false,
                              message:
                                "Your Link has been expired,Please reset new one",
                            });
                          })
                          .catch((err) => {
                            console.log(err);
                            res.json({
                              message: "Error occured while deleting link data",
                            });
                          });
                      } else {
                        bcrypt
                          .hash(req.body.password, 10)
                          .then(async (hashedpasswd) => {
                            const up = await Users.updateOne(
                              { _id: userId },
                              { $set: { password: hashedpasswd } }
                            );
    
                            if (up.modifiedCount > 0) {
                              let message =
                                "Your Password has been Updated,Please login";
                              ResetPassword.deleteOne({ userId })
                                .then(() => {
                                  res.json({ success: true, message: message });
                                })
                                .catch((err) => {
                                  console.log(err);
                                  res.json({
                                    success: false,
                                    message:
                                      "Error occured while deleting resetverification data",
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
                              res.json({
                                success: false,
                                message: "Something went wrong! Please try again!!",
                              });
                            }
                          })
                          .catch((error) => {
                            console.log(error);
                            return res.json({
                              success: false,
                              message: "Error occured while hasing password",
                            });
                          });
                      }
                    } else {
                      return res.json({
                        success: false,
                        message:
                          "Wrong link code,Please try with original one or sign up again",
                      });
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    res.json({
                      success: false,
                      message:
                        "Error occured while reseting your email,Please try again later ",
                    });
                  });
              } else {
                res.json({
                  success: false,
                  message: "Permission denied! Wrong access",
                });
              }
            })
            .catch((error) => {
              console.log(error);
              return res.json({
                success: false,
                message: "Error Occured while reseting your password",
              });
            });
        }
      } catch (error) {
        console.log(error);
        // return res.json({ success: false, message: "Internal Error" });
      }
}
