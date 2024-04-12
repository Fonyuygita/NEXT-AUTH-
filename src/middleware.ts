/**
 * setting up our middleware
 * 
*/

import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoute
} from  "./route"

const {auth}=NextAuth(authConfig);

export default auth((req):any => {
  const {nextUrl}=req;
  const isLoggedIn=!!req.auth;
 
// convert our routes to questions, will then use to protect our pages later
const isApiAuthRoute=nextUrl.pathname.startsWith(apiAuthPrefix);
const isPublicRoute=publicRoute.includes(nextUrl.pathname);
const isAuthRoute=authRoutes.includes(nextUrl.pathname);


//  THE OTHER OF CHECKING YOUR CURRENT ROUTE MATTERS ALOT

// 1_______________users should always be allowed to  access this page
if(isApiAuthRoute){
  return null;
}

//2____________________ if you are in the register page or login page, we want to check if user is logged in and f true, redirect to the setting page, if not show the login page to the public

if(isAuthRoute){
if(isLoggedIn){

  // nextUrl will create an absolute url for us e.g localhost:3000/settings
  return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
}

return null

}

// 3______________________if we are not logged in and not in the public route eg home page, we want to be redirected to the login page
if(!isLoggedIn && !isPublicRoute){

  return Response.redirect(new URL('auth/login', nextUrl));

}

// else allow any other route

return null

})


export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/(api|trpc)(.*)"]
  }