"use server"
import { ResetPasswordSchemas } from "@/schemas";

import { findUserByEmail } from "@/data/user";
import { z } from "zod";
import { generatePasswordResetToken } from "@/lib/token";
import { sendPasswordResetVerification } from "@/lib/email";
// _____________________________START OF CLIENT SIDE VALIDATION___________________________________________
export const reset=async (values : z.infer<typeof ResetPasswordSchemas>)=>{
    const validatedFields=ResetPasswordSchemas.safeParse(values)

    if(!validatedFields.success) {
        return {error: "Invalid mail"}

    }
// _________________________END OF CLIENT SIDE VALIDATION_______________________________________


// _________________________START OF SERVER SIDE VALIDATION_______________________________________


const {email}=validatedFields.data;

const userExist=await findUserByEmail(email)
if(!userExist){
    return {error :"Email not found!"}

}

// allow to reset password
const generatePasswordReset= await generatePasswordResetToken(email);
await sendPasswordResetVerification(generatePasswordReset.email, generatePasswordReset.token)

return {success: "Reset email sent!"}
}
