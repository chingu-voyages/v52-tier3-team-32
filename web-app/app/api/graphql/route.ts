import { ApolloServer } from "@apollo/server";
import { resolvers as appResolvers } from "@/lib/graphql/resolvers";
import { typeDefs as appTypeDefs } from "@/lib/graphql/schema";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const apolloServerInstance = new ApolloServer({
  resolvers: appResolvers,
  typeDefs: appTypeDefs,
});

const handler = startServerAndCreateNextHandler(apolloServerInstance);

export { handler as GET, handler as POST };
