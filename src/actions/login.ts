"use server";

import { signIn } from "@/auth";
import { findUserByEmail } from "@/data/user";
import {  sendVerificationEmail } from "@/lib/email";
import { generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
// import { DEFAULT_LOGIN_REDIRECT } from "../../route";
import { LoginSchemas } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

//  VALIDATING OUR LOGIN FORM ON THE SERVER SIDE
export const login = async (values: z.infer<typeof LoginSchemas>) => {
  const validateFields = LoginSchemas.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validateFields.data;


  /**
   * check if user attempts to sign in without verification token, 
  */
  //first we  get current user

  const existingUser=await findUserByEmail(email);
if(!existingUser || !existingUser.email || !existingUser.password){
  
  return {error :"Email does not exist"}
}

// check if user does not have email, verified, then generate a new verification token
if(!existingUser.emailVerified){
  // generate a new verification token for that user
  const verificationToken=await generateVerificationToken(existingUser.email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return {success:"VerificationToken sent!"}
}


  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};
