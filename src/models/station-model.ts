import { Planet } from "@prisma/client";

export interface Station {
  id: number;
  name: string;
  planet: Planet;
}
