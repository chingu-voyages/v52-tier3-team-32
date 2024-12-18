import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";
import { AppSidebar } from "./ui/app-sidebar";
import AdminInterfaceDataProvider from "./ui/AdminInterfaceDataProvider";

const AdminsLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full h-screen">
        <SidebarTrigger className="block md:hidden" />
        <AdminInterfaceDataProvider>{children}</AdminInterfaceDataProvider>
      </div>
    </SidebarProvider>
  );
};

export default AdminsLayout;
