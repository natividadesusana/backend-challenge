export const MutationType = `
  type Mutation {
    installStation(input: InstallStationInput!): Station!
    recharge(input: RechargeInput!): Recharge
    user(input: userInput!): User!
  }
`;

