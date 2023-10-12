import { fetchExoplanetsData } from "../../api/nasaApi";
import { createNewPlanet } from "../../services/planet-service";
import { SuitablePlanet } from "../../models/suitablePlanet-model";

const planetResolvers = {
  Query: {
    suitablePlanets: async (): Promise<SuitablePlanet[]> => {
      try {
        const exoplanets = await fetchExoplanetsData();

        const suitablePlanetsPromises = exoplanets.map((planet) => createNewPlanet(planet));
        const suitablePlanets = await Promise.all(suitablePlanetsPromises);

        return suitablePlanets.filter((planet) => planet !== null) as SuitablePlanet[];
      } catch (error) {
        throw new Error(`Error getting planets: ${error}`);
      }
    },
  },
};

export default planetResolvers;
