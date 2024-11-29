import { PrismaClient } from "@/prisma/generated-clients/superbase-client";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextApiRequest) => {
  try {
    const val = await prisma.appointments.findMany({
      take: 10,
    });
    console.log(val);
    return NextResponse.json("done");
  } catch (error) {
    console.error(error);
  }
};
