"use client";

import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";

// Disable marker shadow by customizing the icon
const customIcon = new L.Icon({
  iconUrl: "/marker-icon.png", // "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41], // Default size
  iconAnchor: [12, 41], // Anchor point
  popupAnchor: [1, -34], // Popup anchor point
  shadowUrl: undefined, // Disable shadow
});

const InteractiveMap = () => {
  const markers = [
    {
      id: 1,
      position: [34.25647, -118.46806],
      title: "Marker 1",
      description: "This is Marker 1",
    },
    {
      id: 2,
      position: [34.0614, -118.4408],
      title: "Marker 2",
      description: "This is Marker 2",
    },
  ];

  return (
    <MapContainer
      center={[34.0522, -118.45] as LatLngExpression}
      zoom={8}
      style={{ height: "100vh", width: "100%", zIndex: 0 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          icon={customIcon}
          position={marker.position as LatLngExpression}
        >
          {/* Popup: Opens on click */}
          <Popup>
            <div>
              <h3>{marker.title}</h3>
              <p>{marker.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default InteractiveMap;
