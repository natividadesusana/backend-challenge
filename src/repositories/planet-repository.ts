import prisma from "../config/database";
import { ExoplanetData } from "../models/exoplanet-model";

export const PlanetRepository = {
  findPlanetByName: async (planetName: string) => {
    return await prisma.planet.findFirst({
      where: {
        name: planetName,
      },
      include: {
        stations: true,
      },
    });
  },

  createPlanet: async (planetData: ExoplanetData) => {
    return await prisma.planet.create({
      data: {
        name: planetData.hostname,
        mass: planetData.pl_bmassj,
        hasStation: false,
      },
    });
  },
};
