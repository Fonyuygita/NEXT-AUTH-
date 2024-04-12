"use client"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { Button } from "../ui/button"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/route"
// import { DEFAULT_LOGIN_REDIRECT } from "../../../route"

const handlesignIn=(provider:"google" | "github")=>{
    signIn(provider, {
        callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
}

export const Social=()=>{
    return(
        <div className="flex items-center w-full gap-x-2">
   <Button  size="lg" className="w-full" variant="outline" onClick={()=>{handlesignIn("google")}}>
<FcGoogle className="h-5 w-5"/>
   </Button>

   <Button  size="lg" className="w-full" variant="outline" onClick={()=>{ handlesignIn("github") }}>
<FaGithub className="h-5 w-5"/>
   </Button> 
        </div>
    )
}