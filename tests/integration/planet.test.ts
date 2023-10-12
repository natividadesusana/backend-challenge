import axios from "axios";
import { ApolloServer, gql } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import planetResolvers from "graphql/resolvers/planet-resolver";

const prisma = new PrismaClient();

const typeDefs = gql`
  type SuitablePlanet {
    id: Int!
    name: String!
    mass: Float!
    hasStation: Boolean!
  }

  type Query {
    suitablePlanets: [SuitablePlanet]
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: planetResolvers,
  context: { prisma },
});

beforeAll(async () => {
  await server.start();
});

afterAll(async () => {
  await server.stop();
  await prisma.$disconnect();
});

describe("Query suitablePlanets", () => {
  it("should return suitable planets", async () => {
    axios.get = jest.fn().mockResolvedValue({
      data: [
        { pl_name: "Planet1", pl_bmassj: 15.0 },
        { pl_name: "Planet2", pl_bmassj: 5.0 },
      ],
    });

    const res = await server.executeOperation({
      query: gql`
        query {
          suitablePlanets {
            id
            name
            mass
            hasStation
          }
        }
      `,
    });

    expect(res.data.suitablePlanets).toHaveLength(1);
    expect(res.data.suitablePlanets[0].name).toBe("Planet1");
  });
});
