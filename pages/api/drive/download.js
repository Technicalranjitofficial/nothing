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
      const dest = fs.createWriteStream("./video.mp4");

      drive.files.get(
        { fileId: req.body.id, alt: "media", auth: jwToken },
        { responseType: "stream" },
        function (err, resp) {
          resp.data
            .on("end", () => {
              res.json({ sucess: true });
            })
            .on("error", (err) => {
              console.log("Error", err);
              res.json({ sucess: false });
            })
            .pipe(dest);
        }
      );
    } catch (error) {
      console.log(error);
      res.json({ err: error });
    }
  }
}
