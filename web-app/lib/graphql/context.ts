import { PrismaClient } from "@/prisma/generated-clients/superbase-client";
import { ContextFunction } from "@apollo/server";
import { NextApiRequest, NextApiResponse } from "next";

export interface ContextInterface {
  prisma: PrismaClient;
}

// Use a global variable for Prisma client instance
const prisma = new PrismaClient();

export const context: ContextFunction<
  [NextApiRequest, NextApiResponse | undefined],
  ContextInterface
> = async () => ({
  prisma,
});
