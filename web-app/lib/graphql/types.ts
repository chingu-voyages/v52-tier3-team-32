import { PrismaClient } from "@/prisma/generated-clients/postgresql-client";

export interface ContextInterface {
  prisma: PrismaClient;
}

export type RouteJob = {
  startLocation: [number, number];
  endLocation: [number, number];
  destinations: Destination[];
};

export interface Destination {
  id: string;
  time_window: [number, number];
  location: [number, number];
}
