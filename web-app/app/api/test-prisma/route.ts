import { PrismaClient } from "@/prisma/generated-clients/postgresql-client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const val = await prisma.appointments.findMany({
      take: 10,
    });
    console.log(val);
    return NextResponse.json("done", { status: 200 });
  } catch (error) {
    console.error(error);
  }
};
