"use client";

import React from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import MapLoader from "./MapLoader";
import { useAdminInterfaceStates } from "@/lib/redux-toolkit/features/admin-interface/custom-hooks";

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
  // const dispatch = useAppDispatch();

  const { employeeLoc, decodedRoute, appointments } = useAdminInterfaceStates();

  // const aquireCurrentLocation = () => {
  //   function success(position: GeolocationPosition) {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;

  //     dispatch(updateEmployeeLoc([latitude, longitude]));
  //     toast({
  //       title: "Requesting Location",
  //       description:
  //         "Seems I found you. Now Enjoy your personalized experience. I just configured for you.",
  //     });
  //   }

  //   function error() {
  //     toast({
  //       title: "Requesting Location",
  //       description: "Sorry, I failed to find you.",
  //       action: <Button onClick={aquireCurrentLocation}>Try Again</Button>,
  //     });
  //   }

  //   navigator.geolocation.getCurrentPosition(success, error);

  //   dispatch(updateIsAskedEmployeeLoc(true));
  // };

  // useEffect(() => {
  //   toast({
  //     title: "Requesting Location",
  //     description:
  //       "Are you in LA, USA? If yes, You can get a perfect experience if you let me use your location to show how I handle route optimisation for various appointments.",
  //     duration: isAskedEmployeeLoc ? toastDuration : 3600000,
  //     action: (
  //       <div className=" flex flex-col gap-[2px] items-center justify-start">
  //         <Button
  //           aria-atomic
  //           aria-label="Click to allow access to your location"
  //           onClick={aquireCurrentLocation}
  //         >
  //           Allow
  //         </Button>
  //         <ToastAction
  //           altText="Click to decline access to your location"
  //           onClick={() => {
  //             toast({
  //               title: "Requesting Location",
  //               description:
  //                 "Location Access declined. No worries, follow the blue pin, it simulates your Location. Enjoy...",
  //               duration: 1000,
  //             });

  //             dispatch(updateIsAskedEmployeeLoc(true));
  //           }}
  //         >
  //           Decline
  //         </ToastAction>
  //       </div>
  //     ),
  //   });
  // }, []);

  // useEffect(() => {
  //   async function fetchAppointments() {
  //     const query = `
  //       query {
  //         fetchAppointments {
  //           name
  //           email
  //           phone_number
  //           preferred_timeslot
  //           date_timestamp
  //           address
  //           latitude
  //           longitude
  //           status
  //         }
  //       }
  //     `;
  //     try {
  //       const { fetchAppointments } =
  //         await gqlClient.request<FetchAppointments>(query);

  //       fetchAppointments &&
  //         dispatch(updateAppointments([...fetchAppointments]));
  //     } catch (error) {
  //       console.log("Something went wrong!", error);
  //     }
  //   }

  //   if (isAskedEmployeeLoc) {
  //     fetchAppointments();
  //   }
  // }, [isAskedEmployeeLoc]);

  // useEffect(() => {
  //   async function fetchRoute() {
  //     const query = `
  //       query($job: Job!) {
  //         fetchOptimisedRoute(input: $job)
  //       }
  //     `;
  //     const destinations = appointments.map((item) => ({
  //       location: [item.latitude, item.longitude],
  //       time_window: convertTimeslotToTimeWindow(
  //         item.preferred_timeslot,
  //         item.date_timestamp
  //       ),
  //     }));
  //     const variables = {
  //       job: {
  //         startLocation: employeeLoc,
  //         endLocation: employeeLoc,
  //         destinations,
  //       },
  //     };

  //     try {
  //       console.log("some destinations: ", destinations);
  //       const { fetchOptimisedRoute } =
  //         await gqlClient.request<FetchRouteInterface>(query, variables);
  //       console.log("Optimised Routes: ", fetchOptimisedRoute);
  //       if (fetchOptimisedRoute) {
  //         const decodedPolyline = polyline.decode(fetchOptimisedRoute); // Decode the polyline

  //         dispatch(updateDecodeRoute(decodedPolyline)); // Store decoded polyline
  //       }
  //     } catch (error) {
  //       console.log("Route fetching failed: ", error);
  //     }
  //   }

  //   if (appointments.length > 0 && isAskedEmployeeLoc) {
  //     fetchRoute();
  //   }
  // }, [appointments, isAskedEmployeeLoc]);

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
        style={{ height: "100%", width: "100%", zIndex: 0 }}
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
