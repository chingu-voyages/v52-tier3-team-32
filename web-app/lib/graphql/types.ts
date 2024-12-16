import { PrismaClient } from "@/prisma/generated-clients/postgresql-client";

export interface ContextInterface {
  prisma: PrismaClient;
}

export type RouteJob = {
  startLocation: Number[];
  endLocation: Number[];
  destinations: Destination[];
};

export interface Destination {
  time_window: Number[];
  location: Number[];
}
