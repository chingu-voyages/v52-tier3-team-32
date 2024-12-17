"use client";

import gqlClient from "@/lib/graphql/graphqlClient";
import {
  updateEmployeeLoc,
  updateIsAskedEmployeeLoc,
  updateAppointments,
  updateDecodeRoute,
} from "@/lib/redux-toolkit/features/admin-interface/adminInterfaceSlice";
import { useAdminInterfaceStates } from "@/lib/redux-toolkit/features/admin-interface/custom-hooks";
import { useAppDispatch } from "@/lib/redux-toolkit/redux-hooks";
import polyline from "@mapbox/polyline";
import { createContext, ReactNode, useEffect } from "react";
import { FetchAppointments, FetchRouteInterface } from "../map-view/lib/types";
import { convertTimeslotToTimeWindow } from "../map-view/lib/utils";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const AdminInterfaceData = createContext(null);

const AdminInterfaceDataProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const dispatch = useAppDispatch();

  const { employeeLoc, isAskedEmployeeLoc, toastDuration, appointments } =
    useAdminInterfaceStates();

  const aquireCurrentLocation = () => {
    function success(position: GeolocationPosition) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      dispatch(updateEmployeeLoc([latitude, longitude]));
      toast({
        title: "Requesting Location",
        description:
          "Seems I found you. Now Enjoy your personalized experience. I just configured for you.",
      });
    }

    function error() {
      toast({
        title: "Requesting Location",
        description: "Sorry, I failed to find you.",
        action: <Button onClick={aquireCurrentLocation}>Try Again</Button>,
      });
    }

    navigator.geolocation.getCurrentPosition(success, error);

    dispatch(updateIsAskedEmployeeLoc(true));
  };

  useEffect(() => {
    toast({
      title: "Requesting Location",
      description:
        "Are you in LA, USA? If yes, You can get a perfect experience if you let me use your location to show how I handle route optimisation for various appointments.",
      duration: isAskedEmployeeLoc ? toastDuration : 3600000,
      action: (
        <div className=" flex flex-col gap-[2px] items-center justify-start">
          <Button
            aria-atomic
            aria-label="Click to allow access to your location"
            onClick={aquireCurrentLocation}
          >
            Allow
          </Button>
          <ToastAction
            altText="Click to decline access to your location"
            onClick={() => {
              toast({
                title: "Requesting Location",
                description:
                  "Location Access declined. No worries, follow the blue pin, it simulates your Location. Enjoy...",
                duration: 1000,
              });

              dispatch(updateIsAskedEmployeeLoc(true));
            }}
          >
            Decline
          </ToastAction>
        </div>
      ),
    });
  }, []);

  useEffect(() => {
    async function fetchAppointments() {
      const query = `
          query {
            fetchAppointments {
              name
              email
              phone_number
              preferred_timeslot
              date_timestamp
              address
              latitude
              longitude
              status
            }
          }
        `;
      try {
        const { fetchAppointments } =
          await gqlClient.request<FetchAppointments>(query);

        fetchAppointments &&
          dispatch(updateAppointments([...fetchAppointments]));
      } catch (error) {
        console.log("Something went wrong!", error);
      }
    }

    if (isAskedEmployeeLoc) {
      fetchAppointments();
    }
  }, [isAskedEmployeeLoc]);

  useEffect(() => {
    async function fetchRoute() {
      const query = `
          query($job: Job!) {
            fetchOptimisedRoute(input: $job)
          }
        `;
      const destinations = appointments.map((item) => ({
        location: [item.latitude, item.longitude],
        time_window: convertTimeslotToTimeWindow(
          item.preferred_timeslot,
          item.date_timestamp
        ),
      }));
      const variables = {
        job: {
          startLocation: employeeLoc,
          endLocation: employeeLoc,
          destinations,
        },
      };

      try {
        console.log("some destinations: ", destinations);
        const { fetchOptimisedRoute } =
          await gqlClient.request<FetchRouteInterface>(query, variables);
        console.log("Optimised Routes: ", fetchOptimisedRoute);
        if (fetchOptimisedRoute) {
          const decodedPolyline = polyline.decode(fetchOptimisedRoute); // Decode the polyline

          dispatch(updateDecodeRoute(decodedPolyline)); // Store decoded polyline
        }
      } catch (error) {
        console.log("Route fetching failed: ", error);
      }
    }

    if (appointments.length > 0 && isAskedEmployeeLoc) {
      fetchRoute();
    }
  }, [appointments, isAskedEmployeeLoc]);

  return (
    <AdminInterfaceData.Provider value={null}>
      {children}
    </AdminInterfaceData.Provider>
  );
};

export default AdminInterfaceDataProvider;
