import { ContextInterface } from "./context";
import { convertKeysToLowerCase } from "../utils";

const resolvers = {
  Query: {
    hello: () => "Hello there; GraphQL works!",
    fetchAppointments: async (_: any, __: any, context: ContextInterface) => {
      try {
        const appointments = await context.prisma.appointments.findMany();

        return convertKeysToLowerCase(appointments);
      } catch (error) {
        console.log("Error:", error);
        return null;
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
