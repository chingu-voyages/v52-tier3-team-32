import React, { ReactNode } from "react";
import ReduxToolkitStoreProvider from "./ReduxToolkitStoreProvider";
import TanStackQueryClientProvider from "./TanStackQueryClientProvider";

const GlobalAppProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <ReduxToolkitStoreProvider>
      <TanStackQueryClientProvider>{children}</TanStackQueryClientProvider>
    </ReduxToolkitStoreProvider>
  );
};

export default GlobalAppProvider;
