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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </ReduxToolkitStoreProvider>
    </ClerkProvider>
  );
}
export default GlobalProviders;
