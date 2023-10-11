import planetResolvers from "./planet-resolver";
import stationResolvers from "./station-resolver";
import rechargeResolvers from "./recharge-resolver";
import userResolvers from "./user-resolver";

const resolvers = {
  Query: {
    ...planetResolvers.Query,
    ...stationResolvers.Query,
  },
  Mutation: {
    ...stationResolvers.Mutation,
    ...rechargeResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};

export default resolvers;
