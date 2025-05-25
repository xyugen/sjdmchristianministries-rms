import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PageRoutes } from "@/constants/page-routes";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(PageRoutes.LOGIN);
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="min-h-screen w-full p-4">
        <div className="flex flex-row">
          <SidebarTrigger />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
