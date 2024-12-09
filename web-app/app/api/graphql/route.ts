import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import typeDefs from "@/lib/graphql/schema";
import resolvers from "@/lib/graphql/resolvers";
import { context, ContextInterface } from "@/lib/graphql/context";

const server = new ApolloServer<ContextInterface>({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context,
});

export { handler as GET, handler as POST };
