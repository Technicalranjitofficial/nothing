import connectdb from "../../../Components/connectdb";
import Users from "../../../model/Users";


const {verify} = require("jsonwebtoken")

export default async function handler(req,res){
    if(req.method==="POST"){
        const token = req.cookies.AuthToken;
        console.log(token);
        try {
         await connectdb();
        
            verify(token,"PandaSecurity",async function(err,data){
                if(!err && data){
                    console.log(data);
                  const user = await Users.findOne({_id:data.user.id}).select('-password');
                  if(!user){
                    return res.json({sucess:false,message:"User doesn't Exist!"});
                  }
                  return res.json({sucess:true,user:user});
                }
                
                return res.json({sucess:false,message:"Invalid AccessToken"});
            })
        } catch (error) {
            console.log(error);
            return res.json({sucess:false,message:"Internal Error!"});
        }
    }
}