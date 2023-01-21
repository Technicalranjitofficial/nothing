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
      console.log("token",token);
      console.log("error : " + authErr);
    
      return;
    } else {
      console.log("Authorization accorded");
    }
  });
  


export default async function handler(req, res) {
  if (req.method === "POST") {
    try {

      console.log(jwToken);

        drive.files.list(
            {includeItemsFromAllDrives:true,
              supportsAllDrives:true,
              auth: jwToken,
              pageSize: 200,
              q: "'" + req.body.id + "' in parents",
              // fields: "files(id, name,type)",
            },
            (err, { data }) => {
              if (err) return res.json({err:err});
              const files = data.files
              // console.log(files);
              console.log(data.files)
          res.json(files);
   
            }
          );
          
        
    } catch (error) {
        console.log(error)
        res.json({err:error});
    }
  }
}
