import { ExoplanetData } from "../models/exoplanet-model";
import { SuitablePlanet } from "../models/suitablePlanet-model";
import { PlanetRepository } from "../repositories/planet-repository";
import { StationRepository } from "../repositories/station-repository";

export const createNewPlanet = async (planetData: ExoplanetData): Promise<SuitablePlanet | null> => {

  const hasHighGravity = hasHighGravityBasedOnMass(planetData);
  if (!hasHighGravity) {
    return null;
  }

  const existingPlanet = await PlanetRepository.findPlanetByName(planetData.hostname);

  if (!existingPlanet) {
    const newPlanet = await PlanetRepository.createPlanet(planetData);
    return {
      id: newPlanet.id,
      name: newPlanet.name,
      mass: newPlanet.mass,
      hasStation: false,
    };
  }

  const hasStation = await StationRepository.checkIfPlanetHasStations(existingPlanet.id);

  return {
    id: existingPlanet.id,
    name: planetData.hostname,
    mass: planetData.pl_bmassj,
    hasStation,
  };
};

export const hasHighGravityBasedOnMass = (planetData: ExoplanetData): boolean => {
  return planetData.pl_bmassj > 10;
};
