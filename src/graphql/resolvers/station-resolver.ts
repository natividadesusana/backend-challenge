import { stationService } from "../../services/station-service";
import { Station } from "../../models/station-model";
import { StationInput } from "../../models/stationInput-model";

const stationResolvers = {
  Query: {
    stations: async (): Promise<Station[]> => {
      try {
        return await stationService.getStations();
      } catch (error) {
        throw new Error(`Error when searching for stations: ${error.message}`);
      }
    },
  },
  
  Mutation: {
    installStation: async ( _: any, { input }: { input: StationInput } ): Promise<Station | Error> => {
      try {
        return await stationService.installStation(input);
      } catch (error) {
        throw new Error(`Error installing the station: ${error.message}`);
      }
    },
  },
};

export default stationResolvers;
