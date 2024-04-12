import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { findUserById } from "./data/user";
import { UserRole } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,

  /**
   * with prisma we cannot use the database session, because it doesn't work on the edge, so we only need too use jwt: Prisma is non edge supported
   */
} = NextAuth({
  /**
   * sign redirect when something goes wrong on sign in, if something goes wrong regardless of  sign in, error page is going to be triggered
   */
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  /**
   Events helps us to do something each time we log in, here we want to add an email verification date to be the new Date
    Events helps us to do something each time we log in, here we want to add an email verification date to be the new Date
   * 
  */

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  // our callbacks here: sign in, redirect, session, jwt

  callbacks: {

    // Additional protection
async signIn({user, account}){

  // allow OaUTH WITHOUT email verification
  if(account?.provider!=="credentials") return true;
  // check again if users have not verified their email and block them and prevent sign in without email verification
  const existingUser=await findUserById(user.id as string);
  if(!existingUser?.emailVerified) return false

  //TODO : ADD 2FA check HERE

  return true

},

    async session({ token, session }) {
      console.log({ sessionToken: token });
      // check if the user is logged in
      if (session.user && token.sub) {
        session.user.id = token.sub;
        // session.user.customField=token.customField
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      // console.log({ sessionToken: token, session });
      return session;
    },

    async jwt({ token }) {
      // USiNG THIS, BECAUSE WE CAN ACCESS IT IN OUR MIDDLEWARE
      if (!token.sub) return token;
      const existingUser = await findUserById(token.sub);

      if (!existingUser) return token;
      // then put the role in our token as received from our registered db
      token.role = existingUser.role;

      // console.log({ token });

      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
