import { RechargeInput } from "../../models/rechargeInput-model";
import { Recharge } from "../../models/recharge-model";
import { createRecharge } from "../../services/recharge-service";

const rechargeResolvers = {
  Mutation: {
    recharge: async (_: any, { input }: RechargeInput ): Promise<Recharge | Error> => {
      try {
        const { stationId, datetime, userId } = input;
        const recharge = await createRecharge(stationId, datetime, userId);
        return recharge;
      } catch (error) {
        throw new Error(`Error processing recharge: ${error.message}`);
      }
    },
  },
};

export default rechargeResolvers;
