// create find user by email and find user by id functions , because we gonna need   that multiple times i our application

import { db } from "@/lib/db";

export const findUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (err) {
    return null;
  }
};

// find user by id

export const findUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (err) {
    return null;
  }
};
