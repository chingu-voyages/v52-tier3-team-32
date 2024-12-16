"use client";

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import gqlClient from "@/lib/graphql/graphqlClient";
import {
  Appointment,
  FetchAppointments,
  FetchRouteInterface,
} from "../lib/types";
import MapLoader from "./MapLoader";
import { convertTimeslotToTimeWindow } from "../lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";

// Disable marker shadow by customizing the icon
const customIcon = new L.Icon({
  iconUrl: "/marker-icon.png", // "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 30], // Default size
  iconAnchor: [12, 41], // Anchor point
  popupAnchor: [1, -34], // Popup anchor point
  shadowUrl: undefined, // Disable shadow
});

const EmployeeLocIcon = new L.Icon({
  iconUrl: "/location-pin-marker.png", // "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 25], // Default size
  iconAnchor: [12, 41], // Anchor point
  popupAnchor: [1, -34], // Popup anchor point
  shadowUrl: undefined, // Disable shadow
});

const InteractiveMap = () => {
  const [config, setConfig] = useState({
    isAskedEmployeeLoc: false,
    toastDuration: 0,
  });
  const [employeeLoc, setEmployeeLoc] = useState<[number, number]>([
    34.053718, -118.242759,
  ]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [decodedRoute, setDecodedRoute] = useState<LatLngExpression[]>([]); // New state for decoded polyline

  const aquireCurrentLocation = () => {
    function success(position: GeolocationPosition) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setEmployeeLoc([latitude, longitude]);
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

    setConfig({ ...config, isAskedEmployeeLoc: true });
  };

  useEffect(() => {
    toast({
      title: "Requesting Location",
      description:
        "Are you in LA, USA? If yes, You can get a perfect experience if you let me use your location to show how I handle route optimisation for various appointments.",
      duration: config.isAskedEmployeeLoc ? config.toastDuration : 3600000,
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
              setConfig({ ...config, isAskedEmployeeLoc: true });
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

        fetchAppointments && setAppointments([...fetchAppointments]);
      } catch (error) {
        console.log("Something went wrong!", error);
      }
    }

    if (config.isAskedEmployeeLoc) {
      fetchAppointments();
    }
  }, [config.isAskedEmployeeLoc]);

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
          setDecodedRoute(decodedPolyline); // Store decoded polyline
        }
      } catch (error) {
        console.log("Route fetching failed: ", error);
      }
    }

    if (appointments.length > 0 && config.isAskedEmployeeLoc) {
      fetchRoute();
    }
  }, [appointments, config.isAskedEmployeeLoc]);

  return (
    <div className="relative w-full h-full">
      {appointments.length < 1 && (
        <div className="absolute inset-0 z-50">
          <MapLoader />
        </div>
      )}
      <MapContainer
        center={[34.03, -118.0] as LatLngExpression}
        zoom={9.5}
        style={{ height: "100vh", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {appointments.map((appointment) => (
          <Marker
            key={appointment.email}
            icon={customIcon}
            position={[appointment.latitude, appointment.longitude]}
          >
            {/* Popup: Opens on click */}
            <Popup>
              <div>
                <h3>{appointment.name}</h3>
                <p>{appointment.preferred_timeslot}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        <Marker icon={EmployeeLocIcon} position={[...employeeLoc]}>
          <Popup>
            <h1>Your location</h1>
          </Popup>
        </Marker>
        {decodedRoute.length > 0 && (
          <Polyline positions={decodedRoute} color="blue" weight={3} />
        )}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
