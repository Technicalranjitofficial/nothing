import { jwtVerify } from "jose";

 export const jwtAuth = async(token:string)=>{
    try {
       const verified = await jwtVerify(token,new TextEncoder().encode(process.env.SECRET_KEY));
        return verified.payload;
    } catch (error) {
        throw new Error("invalid");
    }
}

