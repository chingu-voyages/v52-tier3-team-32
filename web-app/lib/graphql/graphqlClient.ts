import { GraphQLClient } from "graphql-request";

const baseURL = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
const gqlClient = new GraphQLClient(String(new URL("/api/graphql", baseURL)));

export default gqlClient;
