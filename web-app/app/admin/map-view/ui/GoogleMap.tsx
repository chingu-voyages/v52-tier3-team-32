"use client";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 34.291642,
  lng: -118.243,
};

const GoogleMapRender = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY ?? ""}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Add map markers or additional components here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapRender;
