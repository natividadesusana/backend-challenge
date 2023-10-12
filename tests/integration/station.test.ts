import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';
import { typeDefs } from 'graphql/types';
import stationResolvers from 'graphql/resolvers/station-resolver';

const prisma = new PrismaClient();
let server;
let query, mutate;

beforeAll(async () => {
  server = new ApolloServer({
    typeDefs,
    resolvers: [stationResolvers],
    context: () => ({ prisma }),
  });

  const testClient = createTestClient(server);
  query = testClient.query;
  mutate = testClient.mutate;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Station Resolvers', () => {
  it('should return a list of stations', async () => {
    const GET_STATIONS = gql`
      query {
        stations {
          id
          name
          planet {
            id
            name
          }
        }
      }
    `;
    const { data, errors } = await query({ query: GET_STATIONS });
    expect(errors).toBeUndefined();
    expect(data.stations).toBeDefined();
  });

  it('should install a station', async () => {
    const INSTALL_STATION = gql`
      mutation {
        installStation(input: { name: "Station Name", planet: "Planet Name" }) {
          id
          name
          planet {
            id
            name
          }
        }
      }
    `;
    const { data, errors } = await mutate({ mutation: INSTALL_STATION });
    expect(errors).toBeUndefined();
    expect(data.installStation).toBeDefined();
  });

  it('should throw an error when the planet does not exist', async () => {
    const INSTALL_STATION = gql`
      mutation {
        installStation(input: { name: "Station Name", planet: "Nonexistent Planet" }) {
          id
          name
          planet {
            id
            name
          }
        }
      }
    `;
    const { data, errors } = await mutate({ mutation: INSTALL_STATION });
    expect(data).toBeNull();
    expect(errors).toBeDefined();
    expect(errors[0].message).toContain("Planet 'Nonexistent Planet' not found.");
  });

  it('should throw an error when the station is already installed on the planet', async () => {
    const existingStation = await prisma.station.create({
      data: {
        name: 'Existing Station',
        planetId: 1, 
      },
    });

    const INSTALL_STATION = gql`
      mutation {
        installStation(input: { name: "Station Name", planet: "Planet Name" }) {
          id
          name
          planet {
            id
            name
          }
        }
      }
    `;
    const { data, errors } = await mutate({ mutation: INSTALL_STATION });
    expect(data).toBeNull();
    expect(errors).toBeDefined();
    expect(errors[0].message).toContain("There is already a station installed on the planet 'Planet Name'.");
  });

  afterAll(async () => {
    await prisma.station.deleteMany();
  });
});
