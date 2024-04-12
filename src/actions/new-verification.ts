"use server"

import { findUserByEmail } from "@/data/user";
import { getVerificationByToken } from "@/data/verification-token"
import { db } from "@/lib/db";

// logic to create new verification

export const newVerification=async (token: string)=>{
    const existingToken=await getVerificationByToken(token);

    if(!existingToken){
        return {error :"Token does not exist"}
    }

    const hasExpired=new Date(existingToken.expires) < new Date();

    if(hasExpired){
        return {error :"Token has expired"}
    }

    // Find user we are suppose to validate using this token: For example if user change email in the settings page
    // IN THE CASE OF LOGIN
    const existingUser=await findUserByEmail(existingToken.email);

    if(!existingUser){
        return {error :"Email does not exist"};
    }

    // after checking all of the above, we want to update our database
    await db.user.update({
        where :{id:existingUser.id},
        data : {
            emailVerified : new Date(),
            email:existingToken.email
        }
    })

    // after updating we want to delete our token

    await db.verification.deleteMany({
        where :{id: existingToken.id}
        
})

return {success :"Email has been verified"}
}