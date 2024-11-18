import { gql } from "graphql-tag";

const typeDefs = gql`
  # Define the Query type for fetching data
  type Query {
    # Say hello
    hello: String!
  }

  # Define the Mutations for modifying the data
  type Mutation {
    updateName(newName: String!): String!
  }
`;

export default typeDefs;
