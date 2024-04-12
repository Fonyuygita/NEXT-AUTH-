import {Resend} from "resend"
const resend=new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail=async(email:string,token:string)=>{

   const confirmed_link=`http://localhost:3000/auth/new-verification?${token}`

   

   await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html:`<p>Click <a href="${confirmed_link}">here </a>To Confirm email.</p>`

   })

}