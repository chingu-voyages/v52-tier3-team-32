import { gql } from "graphql-tag";

const typeDefs = gql`
  # Define the Query type for fetching data

  type Appointments {
    id: String!
    name: String
    email: String!
    phone_number: String
    preferred_timeslot: String!
    date_timestamp: String!
    address: String!
    latitude: Float!
    longitude: Float!
    status: String!
  }

  type OptimumRoute {
    decodedRoute: String!
    priorityOrder: [String]
  }

  type Query {
    # Say hello
    hello: String!
    fetchAppointments: [Appointments]
    fetchOptimisedRoute(input: Job!): OptimumRoute
  }

  input Job {
    startLocation: [Float]
    endLocation: [Float]
    destinations: [Destination]!
  }

  input Destination {
    id: ID!
    time_window: [Float]
    location: [Float]
  }

  # Define the Mutations for modifying the data
  type Mutation {
    updateName(newName: String!): String!
  }
`;

export default typeDefs;
