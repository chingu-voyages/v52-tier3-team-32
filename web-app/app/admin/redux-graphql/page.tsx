"use client";
import React, { useEffect, useState } from "react";
import gqlClient from "@/lib/graphql/graphqlClient";
import {
  useAppDispatch,
  useAppSelector,
} from "@/lib/redux-toolkit/redux-hooks";
import { updateNameClientSide } from "@/lib/redux-toolkit/features/name-updater/nameUpdaterSlice";

interface HelloType {
  hello: string;
}

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

const VisualizeMutation = () => {
  const [nameUpdate, setNameUpdate] = useState("");
  const [message, setMessage] = useState<any>("");
  const [trigger, setTrigger] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function makeMutation(newName: string) {
      const queryStr = `mutation($newName: String!) { updateName(newName: $newName) }`;
      const variable = { newName };
      const data = await gqlClient.request<any>(queryStr, variable);
      setMessage(data.updateName);
      setTrigger(false);
    }

    trigger && makeMutation(nameUpdate);
  }, [trigger]);

  return (
    <div className="flex flex-col gap-2">
      <span>GraphQL Mutation</span>
      <span>message: {message || "_"}</span>
      <input
        type="text"
        placeholder="enter name update"
        value={nameUpdate}
        onChange={(e) => {
          setNameUpdate(e.target.value);
        }}
      />

      <button
        onClick={() => setTrigger(true)}
        className="p-3 rounded-md bg-green-500"
      >
        Click to make GraphQL Mutation
      </button>
      <button
        onClick={() => dispatch(updateNameClientSide(nameUpdate))}
        className="p-3 rounded-md bg-green-500"
      >
        click to store Client Side - redux
      </button>
    </div>
  );
};

const HomePage = () => {
  const name = useAppSelector((state) => state.nameUpdater.name);

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center gap-2 p-4">
      <button
        onClick={() => window.location.reload()}
        className="p-3 rounded-md bg-green-500"
      >
        refresh page
      </button>
      <h1 className=" text-3xl font-semibold">
        This Page is meant to explain the implementation of GraphQL and
        redux-toolkit
      </h1>
      <div className=" w-full relative flex md:flex-row flex-col items-center gap-4 md:justify-between">
        {/* query visualization */}
        <FetchHelloComponent />
        <div className="h-full w-1 bg-gray-400 rounded-full" />
        <VisualizeMutation />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <span className="text-xl font-semibold">Redux toolkit</span>
        <span>Name saved in the redux toolkit is: {name}</span>
      </div>
    </main>
  );
};

export default HomePage;
