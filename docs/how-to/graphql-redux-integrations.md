# Integrating Redux and Graph QL to next.js 13+

> With app router

This is a breif guide of how Graph QL and Redux have been added to the current web-app, and how to utilize them.
Relevant resources are referenced at the end of this document.

## GraphQL

> For server side we use Apollo Server.

Graph QL is a specification library and query language for APIs. I has lots of benefits but most of them you can read from their official page.

### Why I recommend we use graphql in this project.

1.  to avoid the need to defined route handlers for the serverside; as this can lead to mismanaged error handling;
2.  to avoid repetitive code for each route created.
3.  will have faster development once you understand the boilder plate code setup.
4.  incase you are stuck on how to make a query, just go to localhost:port/api/graphql and it will serve you with a GraphQL playground.
5.  as a team we won't need to define any error messages; the issue with language barrier is solved for us;

### How graphQL has been setup - how to use it.

> Apollo Server located at /api/graphql/route.ts

```graphql
const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };

```

The `startServerAndCreateNextHandler()` method is utilized to make the apollo server accessible in a serverless environment.

> GraphQL Client - without using third party libraries

```graphql
import { GraphQLClient } from "graphql-request";

const baseURL = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
const gqlClient = new GraphQLClient(String(new URL("/api/graphql", baseURL)));

export default gqlClient;
```

Create a globally accessible graphql client. In the example above we use the GraphQLClient object imported from graphql-request package; this package it provided by the official graphql library.

> Use the gqlClient in any react component.

```ts
const FetchHelloComponent = () => {
  const [greeting, setGreeting] = useState<string | null>(null);

  const fetchHello = async () => {
    const queryStr = `query { hello }`;
    try {
      const data = await gqlClient.request<HelloType>(queryStr);
      setGreeting(data.hello);
    } catch (error) {
      console.error("Error fetching hello:", error);
      setGreeting("Error fetching message");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span>GraphQL Query</span>
      <span>message: {greeting ?? "_"}</span>
      <button onClick={fetchHello} className="p-3 rounded-md bg-green-500">
        click to Make Query
      </button>
    </div>
  );
};
```

In all this process, the client side component can make the graphql query maintaining clean modular code, if rtk-query was utilized. Because rtk-query listens for error states, data, and the fetch state (pending | fulfilled | error); this states are made available for the component by the hook provided by rtk-query.
Example: (not used in this project)

```js
const { data, error, isLoading } = useGetEventsQuery();
```

## Redux toolkit

> Redux must be used sparingly - VERY IMPORTANT!!!

In this project, I recommended redux toolkit because:

1.  If there is any need to utilize global state management.
2.  It provides an organized way to manage resources. The knowledge of slices that hold the state, reducer method for state management, and the store that manages the various slices.

### How redux-toolkit has been setup.

- In the /lib/redux folder, is a store.ts file. It implements a store component that gets initiated only when needed, but not when the app initially runs.
- In the /lib/redux/features, are folders that can be used to define the different `slices` that implement the actual state management.
- In the slice file, the createSlice method is used to implement the slice name, the initial state, and the reducer methods. Reducer methods update the state of the slice.
- Export the slice reducer as default module and export the various dipatch accessible actions from that slice.
- In the /lib/redux/store.ts file, wire up the reducer to the store configuration.

### How redux-toolkit is used in Client side React Components

> Accessing global varibles

Example code:

```js
const name = useAppSelector((state) => state.nameUpdater.name);
```

> Updating global state

Example code:

```js
<button
  onClick={() => dispatch(updateNameClientSide(nameUpdate))}
  className="p-3 rounded-md bg-green-500"
>
  click to store Client Side - redux
</button>
```

> but why not use Zustand; it's easier!

Yeah, while Zustand is easier to implement and almost widely known as redux:

1.  iI abstructs most of the tasks that help appreciate the context of a global state manager.
2.  It will ease the integration of rtk-query for those that will choose to use it.
3.  Redux has a wide use in todays market that other global state managers. So, learning how to use it will be a plus.

## Learn more from the official documentations

[Graph QL](https://graphql.org/)
[Redux-toolkit](https://redux-toolkit.js.org/usage/nextjs)
