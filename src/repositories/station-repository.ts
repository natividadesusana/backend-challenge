import prisma from "../config/database";
import { Station } from "../models/station-model";

export const StationRepository = {
  getStationsWithPlanets: async (): Promise<Station[]> => {
    return await prisma.station.findMany({
      include: {
        planet: true,
      },
    });
  },

  findPlanetByName: async (planetName: string) => {
    return await prisma.planet.findFirst({
      where: { name: planetName },
    });
  },

  findStationOnPlanet: async (planetId: number) => {
    return await prisma.station.findFirst({
      where: {
        planetId: planetId,
      },
    });
  },

  createStation: async (name: string, planetId: number) => {
    return await prisma.station.create({
      data: {
        name,
        planetId,
      },
      include: {
        planet: true,
      },
    });
  },

  updatePlanetHasStation: async (planetId: number) => {
    await prisma.planet.update({
      where: {
        id: planetId,
      },
      data: {
        hasStation: true,
      },
    });
  },

  checkIfPlanetHasStations: async (planetId: number) => {
    const existingPlanet = await prisma.planet.findFirst({
      where: {
        id: planetId,
      },
      include: {
        stations: true,
      },
    });

    return !!existingPlanet.stations.length;
  },
};
