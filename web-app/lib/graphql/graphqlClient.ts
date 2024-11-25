import { GraphQLClient } from "graphql-request";

const baseURL =
  process.env.NEXT_PUBLIC_PRODUCTION_URL ?? "http://localhost:3000";
const gqlClient = new GraphQLClient(String(new URL("/api/graphql", baseURL)));

export default gqlClient;
