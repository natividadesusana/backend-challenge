import { User } from "@prisma/client";

export interface Recharge {
  id: number;
  datetime: string;
  user: User;
}
