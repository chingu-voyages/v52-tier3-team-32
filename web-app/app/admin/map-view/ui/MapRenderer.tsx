"use client";

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import gqlClient from "@/lib/graphql/graphqlClient";
import { Appointment, FetchAppointments } from "./utils";

// Disable marker shadow by customizing the icon
const customIcon = new L.Icon({
  iconUrl: "/marker-icon.png", // "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41], // Default size
  iconAnchor: [12, 41], // Anchor point
  popupAnchor: [1, -34], // Popup anchor point
  shadowUrl: undefined, // Disable shadow
});

const EmployeeLocIcon = new L.Icon({
  iconUrl: "/location-pin-marker.png", // "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41], // Default size
  iconAnchor: [12, 41], // Anchor point
  popupAnchor: [1, -34], // Popup anchor point
  shadowUrl: undefined, // Disable shadow
});

const InteractiveMap = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

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

    fetchAppointments();
  }, []);

  return (
    <MapContainer
      center={[34.03, -118.0] as LatLngExpression}
      zoom={9.5}
      style={{ height: "100vh", width: "100%", zIndex: 0 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
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
      <Marker icon={EmployeeLocIcon} position={[34.053718, -118.242759]}>
        <Popup>
          <h1>Your location</h1>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default InteractiveMap;
