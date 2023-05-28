const  {google}  = require("googleapis");

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
  var parents = "1E8fVXMIlHhPhhWDR1h1Gi6AxKmeR-0MO";
  
  const token = "ya29.a0AX9GBdWazzA81mYvlCLLBwcctUVQkUEgO9293nq0vHyZd66QGFetwp5BTlnLF2B…";
  jwToken.authorize((authErr,token) => {
    if (authErr) {
      console.log("error : " + authErr);
      return;
    } else {
      console.log("Authorization accorded");
    }
  });
  
  const fields = 'nextPageToken, files(id, name, createdTime, modifiedTime, mimeType, size)';

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {

        drive.files.list(
            {includeItemsFromAllDrives:true,
              supportsAllDrives:true,
              auth: jwToken,
              pageSize: 200,
              q: "'" + req.body.id + "' in parents",
              // fields: "files(id, name,type)",
              fields:fields
            },
            
            (err, { data }) => {
              if (err) return console.log("The API returned an error: " + err);
              const files = data.files
              // console.log(files);
              console.log(data.files)
          res.json(files);
            //   files.map(async (data)=>{
            //    res
            //   })
              
              // if (files.length) {
              //   console.log("Files:");
              //   files.map((file) => {
                
              //     console.log(file);
              //   });
              // } else {
              //   console.log("No files found.");
              // }
            }
          );
          
        
    } catch (error) {
        console.log(error)
        res.json({err:error});
    }
  }
}
