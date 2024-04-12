import {db} from "@/lib/db"
export const getVerificationByToken=async(token:string)=>{
    try {

        const verificationToken=await db.verification.findUnique({
            where:{token}
        })

        return verificationToken
        
    } catch (err) {
        return null
        
    }
}


export const getVerificationByEmail=async(email:string)=>{
    try {

        const verificationToken=await db.verification.findFirst({
            where:{
                email
            }
        })

        return verificationToken
        
    } catch (err) {
        return null
    }
}