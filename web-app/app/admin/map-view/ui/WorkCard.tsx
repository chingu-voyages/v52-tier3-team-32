"use client";

import React, { useState } from "react";
import MapLoader from "./MapLoader";
import { Button } from "@/components/ui/button";

const WorkCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [startedWork, setStartedWork] = useState(false);
  /*Plan#
    - have a start work btn; 
    - when clicked, have the show a loader;
    - while showing loader, from redux store seek the (next) appointment intended most important.
    - via gql, seek the decoded route to that location, and render on map;
    - withdraw the loader, to expose the work card details;
    - on work card render: residents' name, location, time of travel, time window, check-in-appointment btn.
    - when check-in-appointment btn is clicked show counter of time; also render a check-out-appointment btn.
    - when check-out-appointment btn is clicked, render a next-appointment btn.
    - when next-appointment btn is clicked, restart this flow.
    */
  return (
    <div className="absolute top-5  right-5 z-50  ">
      <div className="relative bg-white p-3 rounded-lg transition-all duration-1000 ease-linear">
        {isLoading ? (
          <MapLoader />
        ) : (
          <div className="">
            {!startedWork ? (
              <Button onClick={() => setStartedWork(true)}>Start work</Button>
            ) : (
              <div>
                {/* details */}
                Appointment details
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkCard;
