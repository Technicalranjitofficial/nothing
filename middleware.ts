import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { jwtAuth } from "./lib/jwtAuth";
// require("dotenv").config();

export async function middleware(req:NextRequest) {
  const token = req.cookies.get("AuthToken");
  console.log("token",token);
  let url = req.url;

  const verified =
    token &&
    (await jwtAuth(token.value).catch((err) => {
      console.log(err);
     return NextResponse.json({err:err,token:token,sucess:"false"});
    }));

  if (req.nextUrl.pathname.startsWith("/login") && !verified) {
    return;
  }

  if (verified===undefined) {
    console.log("Not verified")
  // return NextResponse.json({err:"Error NotVerified",token:token,verified:verified,sucess:false});
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (verified && req.nextUrl.pathname.startsWith("/login")) {
    // return NextResponse.json({err:" verified",token:token,verified:verified});
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard',],
  // matcher: ["/login", "/", '/dashboard','/Coding/C','/Coding/java'],
};
