import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="min-h-screen items-center p-4">
        <div className="flex flex-row">
          <SidebarTrigger />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
