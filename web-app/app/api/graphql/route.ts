import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import typeDefs from "@/lib/graphql/schema";
import resolvers from "@/lib/graphql/resolvers";
import { context } from "@/lib/graphql/context";
import { ContextInterface } from "@/lib/graphql/types";

const server = new ApolloServer<ContextInterface>({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context,
});

export { handler as GET, handler as POST };
