import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/types";
import resolvers from "./graphql/resolvers";

const port = process.env.PORT || 3000;

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
