import React, { ReactNode } from "react";
import WorkCard from "./ui/WorkCard";

const MapViewLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main className="relative w-full h-full">
      {children}
      <WorkCard />
    </main>
  );
};

export default MapViewLayout;
