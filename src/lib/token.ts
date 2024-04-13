import { getVerificationByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getPasswordResetTokenByToken, getPasswordResetToneByEmail } from "@/data/password-reset-token";

// GENERATE PASSWORD RESET TOKEN

export const generatePasswordResetToken=async(email:string)=>{

const token=uuidv4();
const expires=new Date(new Date().getTime() + 3600 * 1000);

// check for token existence
const existingToken=await getPasswordResetToneByEmail(email);
if(existingToken){
  await db.passwordResetToken.delete({
    where: {
      id: existingToken?.id,
    }, 
  })
}
const generatePasswordToken=await db.passwordResetToken.create({
  data:{
    email,
    token,
    expires
  }
})

return generatePasswordToken

}







export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();

  // expire the token in one hour
//   calculate the number of milliseconds in one hour 
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  console.log(expires)

  // check if token already send
  const existingToken = await getVerificationByEmail(email);

  if (existingToken) {
    // go ahead and remove it from our database
    await db.verification.deleteMany({
      where: {
        id: existingToken?.id,
      },
    });
  }

  // create new verification token

  const verificationToken = await db.verification.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
