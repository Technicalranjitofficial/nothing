const mongoose = require("mongoose");
require("dotenv").config();
const uri =process.env.URI;
export default async function () {
  if (mongoose.connection.readyState == 1) {
    console.log("Already Connected");
    return;
  }
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) console.log(err);
      else console.log("Connected to mongodb");
    }
  );
}
