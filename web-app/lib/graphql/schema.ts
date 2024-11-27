import { gql } from "graphql-tag";

const typeDefs = gql`
  # Define the Query type for fetching data
  type Appointments {
    name: String!
    email: String!
    phone_number: String!
    preferred_timeslot: String!
    date_timestamp: String!
    address: String!
    geo_coordinates: [String]!
  }

  type Query {
    # Say hello
    hello: String!
    fetchAppointments: Appointments
  }

  # Define the Mutations for modifying the data
  type Mutation {
    updateName(newName: String!): String!
  }
`;

export default typeDefs;
