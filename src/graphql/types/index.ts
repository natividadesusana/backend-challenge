import { PlanetType } from "./planet-type";
import { StationType } from "./station-type";
import { RechargeType } from "./recharge-type";
import { QueryType } from "./query-type";
import { MutationType } from "./mutation-type";
import { UserType } from "./user-type";
import { InstallStationInput, RechargeInput, userInput } from "./input-types";

export const typeDefs = `
  #graphql
  ${PlanetType}
  ${StationType}
  ${RechargeType}
  ${QueryType}
  ${MutationType}
  ${UserType}
  ${InstallStationInput}
  ${RechargeInput}
  ${userInput}
`;
