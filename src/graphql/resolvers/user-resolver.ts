import { UserService } from "../../services/user-service";

const userResolvers = {
  Mutation: {
    user: async (_: any, { input }: { input: { username: string } }) => {
      try {
        const { username } = input;

        const createdUser = await UserService.createUser(username);

        return createdUser;
      } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
      }
    },
  },
};

export default userResolvers;
