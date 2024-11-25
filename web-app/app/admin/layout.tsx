import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";
import { AppSidebar } from "./ui/app-sidebar";

const AdminsLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full h-screen">
        <SidebarTrigger className="block md:hidden" />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default AdminsLayout;
