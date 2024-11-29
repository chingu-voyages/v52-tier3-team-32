import { PrismaClient } from "@/prisma/generated-clients/superbase-client";
import { ContextInterface } from "./context";

const resolvers = {
  Query: {
    hello: () => "Hello there; GraphQL works!",
    fetchAppointments: async (_: any, __: any, context: ContextInterface) => {
      try {
        const appointments = await context.prisma.appointments.findMany();
        return appointments;
      } catch (error) {
        console.log("Error:", error);
      }
    },
  },
  Mutation: {
    updateName: (_: any, { newName }: { newName: string }) => {
      return `After mods: Hello there; I am ${newName}`;
    },
  },
};

export default resolvers;
