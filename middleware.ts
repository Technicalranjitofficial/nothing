import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { jwtAuth } from "./lib/jwtAuth";
// require("dotenv").config();

export async function middleware(req:NextRequest) {
  const token = req.cookies.get("AuthToken")?.value;
  console.log("token",token);
  let url = req.url;

  const verified =
    token &&
    (await jwtAuth(token).catch((err) => {
      console.log(err);
      NextResponse.json({err:err,token:token});
    }));

  if (req.nextUrl.pathname.startsWith("/login") && !verified) {
    return;
  }

  if (verified===undefined) {
    console.log("Not verified")
  // return NextResponse.json({err:"Error NotVerified",token:token});
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (verified && req.nextUrl.pathname.startsWith("/login")) {
    // return NextResponse.json({err:" verified",token:token});
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/", '/dash'],
};
