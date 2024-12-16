import { PrismaClient } from "@/prisma/generated-clients/postgresql-client";
import { ContextFunction } from "@apollo/server";
import { NextApiRequest, NextApiResponse } from "next";
import { ContextInterface } from "./types";

// Use a global variable for Prisma client instance
const prisma = new PrismaClient();

export const context: ContextFunction<
  [NextApiRequest, NextApiResponse | undefined],
  ContextInterface
> = async () => ({
  prisma,
});
