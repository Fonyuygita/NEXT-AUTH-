import { getVerificationByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";

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
