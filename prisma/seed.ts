import prisma from "../src/config/database";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const planetSeedData = [
  {
    id: 1,
    name: "Planet 1",
    mass: 10.5,
    hasStation: false,
  },
  {
    id: 2,
    name: "Planet 2",
    mass: 8.7,
    hasStation: true,
  },
];

const stationSeedData = [
  {
    name: "Station 1",
    planetId: 1,
  },
  {
    name: "Station 2",
    planetId: 2,
  },
];

const userSeedData = [
  {
    username: "Chico",
  },
  {
    username: "Maria",
  },
];

const rechargeSeedData = [
  {
    datetime: dayjs().tz("America/Sao_Paulo").format(),
    stationId: 1,
    userId: 1,
    isCompleted: false,
  },
  {
    datetime: dayjs().tz("America/Sao_Paulo").format(),
    stationId: 2,
    userId: 2,
    isCompleted: false,
  },
];

async function seed() {
  for (const data of planetSeedData) {
    await prisma.planet.create({
      data,
    });
  }

  for (const data of stationSeedData) {
    await prisma.station.create({
      data,
    });
  }

  for (const data of userSeedData) {
    await prisma.user.create({
      data,
    });
  }

  for (const data of rechargeSeedData) {
    await prisma.recharge.create({
      data,
    });
  }
}

seed().catch((error) => {
  console.error(`Error seeding data: ${error}`);
});
