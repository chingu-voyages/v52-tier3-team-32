const resolvers = {
  Query: {
    hello: () => "Hello there; GraphQL works!",
    fetchAppointments: () => {},
  },
  Mutation: {
    updateName: (_: any, { newName }: { newName: string }) => {
      return `After mods: Hello there; I am ${newName}`;
    },
  },
};

export default resolvers;
