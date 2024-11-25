import dynamic from "next/dynamic";

const Map = dynamic(() => import("./ui/MapRenderer"), {
  loading: () => <p>Loading map...</p>,
  ssr: false,
});

const MapViewPage = () => {
  return <Map />;
};

export default MapViewPage;
