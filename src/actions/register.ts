"use server";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import { db } from "@/lib/db";
import { findUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/email";

//  VALIDATING OUR REGISTER FORM ON THE SERVER SIDE
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  // get validated fields
  // console.log(validateFields);
  const { email, password, name } = validateFields.data;
  // hash our password
  const hashedPassword = await bcrypt.hash(password, 10);
  // check if user already exist
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return { error: "User already exist " };
  }
  // else we want to create a user and  store the user in our database
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken=await generateVerificationToken(email)
  
  //   SEND VERIFICATION TOKEN EMAIL
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return { success: "Email verification sent!" };
};
