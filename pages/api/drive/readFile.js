const fs = require("fs");

export default async function  handler(req,res){
    if(req.method==="POST"){
        try {
            const data =  fs.readFileSync("C:\Users\KIIT01\OneDrive\Desktop\KIIT_Project\test\kiit_university_app\pages\api\drive\program.txt", {encoding:'utf8', flag:'r'});
            res.json(data);

        } catch (error) {
            res.json({error:error});
        }
    }
}