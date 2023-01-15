const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const key = require("../../../crediential/crediential.json");
const auth = new google.auth.GoogleAuth({
  keyFile: key,
  scopes: "https://www.googleapis.com/auth/drive",
});

var drive = google.drive({
  version: "v3",
  auth: auth,
});

var jwToken = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ["https://www.googleapis.com/auth/drive"],
  null
);

jwToken.authorize((authErr, token) => {
  if (authErr) {
    console.log("error : " + authErr);
    return;
  } else {
    console.log("Authorization accorded");
  }
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
    
      var fileMetadata = {
        name: "video.mp4",
        parents: [req.body.id],
      };
    //   C:\Users\KIIT01\OneDrive\Desktop\KIIT_Project\test\kiit_university_app\pages\api\drive\video.mp4
      var media = {
        mimeType: "video/mp4",
        body: fs.createReadStream(path.join(__dirname, "./video.mp4")),
      };
      drive.files.create(
        {
          auth: jwToken,
          resource: fileMetadata,
          media: media,
          fields: "id",
        },
        function (err, file) {
          if (err) {
            // Handle error
            console.error(err);
            res.json({success:false,message:"Error "});
          } else {
            res.json({success:true,message:"File has been created ",file:file});
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.json({ err: error });
    }
  }
}
