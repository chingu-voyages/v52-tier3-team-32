"use client";
import ReduxToolkitStoreProvider from "./ReduxStoreProvider";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";

function GlobalProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
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
    </ClerkProvider>
  );
}
export default GlobalProviders;
