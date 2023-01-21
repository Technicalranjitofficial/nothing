import cookie from "cookie";

export default async function handler(req,res){
    if(req.method==="POST"){
        try {
            // console.log(res.clearCookie("AuthToken"));
            res.setHeader('Set-Cookie',cookie.serialize('AuthToken',"",{
                httpOnly:true,
                secure:process.env.NODE_ENV!=='development',
                sameSite:true,
                maxAge:0,
                path:'/'
                
            }));
           return res.json({success:true});
       } catch (error) {
        console.log(error);
        
        return res.json({success:false});
       }

    }
}