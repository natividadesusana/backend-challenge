export const RechargeType = `
  type Recharge {
    id: ID!
    datetime: String!
    station: Station!
    user: User!
    isCompleted: Boolean!
  }
`;
