export const InstallStationInput = `
  input InstallStationInput {
    name: String!
    planet: String!
  }
`;

export const RechargeInput = `
  input RechargeInput {
    stationId: Int!
    datetime: String!
    userId: Int!
  }
`;

export const userInput = `
  input userInput {
    username: String!
  }
`;