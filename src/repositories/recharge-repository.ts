import prisma from "../config/database";

export const RechargeRepository = {
  findUserById: async (userId: number) => {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  },

  findStationById: async (stationId: number) => {
    return await prisma.station.findUnique({
      where: { id: stationId },
    });
  },

  findUserRechargeInProgress: async (userId: number) => {
    return await prisma.recharge.findFirst({
      where: {
        userId,
        isCompleted: false,
      },
    });
  },

  findStationRechargeInProgress: async (stationId: number) => {
    return await prisma.recharge.findFirst({
      where: {
        stationId,
        isCompleted: false,
      },
    });
  },

  createRecharge: async (datetime: Date, stationId: number, userId: number) => {
    return await prisma.recharge.create({
      data: {
        datetime,
        stationId,
        userId,
        isCompleted: false,
      },
      include: {
        user: true,
      },
    });
  },

  completeRecharge: async (rechargeId: number) => {
    return await prisma.recharge.update({
      where: { id: rechargeId },
      data: { isCompleted: true },
    });
  },
};
