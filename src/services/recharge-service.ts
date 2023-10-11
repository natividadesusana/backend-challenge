import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Recharge } from "../models/recharge-model";
import { RechargeRepository } from "../repositories/recharge-repository";

dayjs.extend(utc);
dayjs.extend(timezone);

export const createRecharge = async (stationId: number, datetime: string, userId: number): Promise<Recharge> => {
  const existingUser = await RechargeRepository.findUserById(userId);
  if (!existingUser) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  const existingStation = await RechargeRepository.findStationById(stationId);
  if (!existingStation) {
    throw new Error(`Station with ID ${stationId} not found.`);
  }

  const existingUserRecharge = await RechargeRepository.findUserRechargeInProgress(userId);
  if (existingUserRecharge) {
    throw new Error(`The user with ID ${userId} already has a recharge in progress.`);
  }

  const existingStationRecharge = await RechargeRepository.findStationRechargeInProgress(stationId);
  if (existingStationRecharge) {
    throw new Error(`There is already a recharge in progress for the station with ID ${stationId}.`);
  }

  const targetDatetime = dayjs(datetime).tz("America/Sao_Paulo");
  const utcDatetime = targetDatetime.utc();
  const now = dayjs().tz("America/Sao_Paulo");

  if (now >= targetDatetime) {
    throw new Error(`The assigned date and time are in the past!`);
  }

  const timeDifference = targetDatetime.diff(now);

  const recharge = await RechargeRepository.createRecharge(utcDatetime.toDate(), stationId, userId);

  const formattedDatetime = targetDatetime.format("YYYY-MM-DD HH:mm:ss");

  setTimeout(async () => {
    await RechargeRepository.completeRecharge(recharge.id);
  }, timeDifference);

  return { ...recharge, datetime: formattedDatetime };
};
