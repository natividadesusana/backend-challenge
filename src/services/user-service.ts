import { User } from "@prisma/client";
import { UserRepository } from "../repositories/user-repository";

export class UserService {
  static async createUser(username: string): Promise<User> {
    try {
      if (!username.trim() || /\d/.test(username)) {
        throw new Error(
          `Invalid username. Please choose a valid username without numbers.`
        );
      }

      const existingUser = await UserRepository.findUserByUsername(username);

      if (existingUser) {
        throw new Error(
          `Username '${username}' already exists. Please choose another username.`
        );
      }

      const createdUser = await UserRepository.createUser(username);

      return createdUser;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }
}
