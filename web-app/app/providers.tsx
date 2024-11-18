"use client";
import ReduxToolkitStoreProvider from "./global-ui/providers/ReduxStoreProvider";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/toaster";

function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReduxToolkitStoreProvider>
      <Toaster />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ReduxToolkitStoreProvider>
  );
}
export default Providers;
