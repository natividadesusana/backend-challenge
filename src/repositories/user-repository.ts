import prisma from "../config/database";
import { User } from "@prisma/client";

export const UserRepository = {
  findUserByUsername: async (username: string): Promise<User | null> => {
    return await prisma.user.findUnique({
      where: { username },
    });
  },

  createUser: async (username: string): Promise<User> => {
    return await prisma.user.create({
      data: {
        username,
      },
    });
  },
};
