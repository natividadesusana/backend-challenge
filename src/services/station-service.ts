import { Station } from "../models/station-model";
import { StationInput } from "../models/stationInput-model";
import { StationRepository } from "../repositories/station-repository";

export const stationService = {
  getStations: async (): Promise<Station[]> => {
    try {
      return await StationRepository.getStationsWithPlanets();
    } catch (error) {
      throw new Error(`Error when searching for stations: ${error.message}`);
    }
  },

  installStation: async (input: StationInput): Promise<Station | Error> => {
    try {
      const { name, planet } = input;

      if (!name || name.trim() === "") {
        throw new Error(`Station name cannot be empty.`);
      }

      const existingPlanet = await StationRepository.findPlanetByName(planet);

      if (!existingPlanet) {
        throw new Error(`Planet '${planet}' not found.`);
      }

      const existingStationOnPlanet =
        await StationRepository.findStationOnPlanet(existingPlanet.id);

      if (existingStationOnPlanet) {
        throw new Error(
          `There is already a station installed on the planet '${planet}'.`
        );
      }

      const newStation = await StationRepository.createStation(
        name,
        existingPlanet.id
      );

      await StationRepository.updatePlanetHasStation(existingPlanet.id);

      return newStation;
    } catch (error) {
      throw new Error(`Error installing the station: ${error.message}`);
    }
  },
};
