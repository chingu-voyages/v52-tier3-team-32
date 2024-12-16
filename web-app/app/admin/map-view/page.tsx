import dynamic from "next/dynamic";
import MapLoader from "./ui/MapLoader";

const Map = dynamic(() => import("./ui/MapRenderer"), {
  loading: () => <MapLoader />,
  ssr: false,
});

const MapViewPage = () => {
  return <Map />;
};

export default MapViewPage;
