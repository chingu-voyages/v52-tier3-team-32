import { convertKeysToLowerCase } from "../utils";
import { ContextInterface, RouteJob } from "./types";

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
    fetchOptimisedRoute: async (
      _: any,
      args: { input: RouteJob },
      context: ContextInterface
    ) => {
      const apiKey = process.env.ORS_API_TOKEN ?? "";

      try {
        const jobs = args.input.destinations.map((item, index) => ({
          id: index,
          service: 1200,
          location: [item.location[1], item.location[0]],
          skills: [1],
          time_windows: [[...item.time_window]],
        }));

        const vehicles = [
          {
            id: 1,
            profile: "driving-car",
            start: [args.input.startLocation[1], args.input.startLocation[0]],
            end: [args.input.endLocation[1], args.input.endLocation[0]],
            capacity: [3],
            skills: [1, 2],
          },
        ];

        const optimisationUrl = "https://api.openrouteservice.org/optimization";
        const response = await fetch(optimisationUrl, {
          method: "POST",
          headers: {
            Accept:
              "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
            Authorization: apiKey,
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({ jobs, vehicles }),
        });
        const data = (await response.json()) ?? {};
        console.log("ORS Optimization Response:", JSON.stringify(data));
        const coordinates =
          data.routes[0]?.steps.map((step: any) => step.location) ?? null;

        // get the directions geometry
        const directionsUrl =
          "https://api.openrouteservice.org/v2/directions/driving-car";
        const resp = await fetch(directionsUrl, {
          method: "POST",
          headers: {
            Accept:
              "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ coordinates }),
        });

        const respData = await resp.json();
        return respData.routes[0]?.geometry ?? null;
      } catch (error: any) {
        console.error("ORS Optimization Failed:", error.message, error.stack);
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
