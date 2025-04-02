import { Landmark, Home } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { PageRoutes } from "@/constants/page-routes";
import AppMainSidebar from "./app-main-sidebar";
import { AppUserSidebar } from "./app-user-sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-1.5 text-center text-lg font-medium">
        SJDM Christian Ministry
      </SidebarHeader>

      <SidebarContent className="mt-4">
        <SidebarGroup>
          <SidebarMenuButton asChild>
            <a href={PageRoutes.DASHBOARD}>
              <Home />
              <span>Dashboard</span>
            </a>
          </SidebarMenuButton>
        </SidebarGroup>

        <SidebarGroup>
          <AppMainSidebar />
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenuButton asChild>
            <a href={PageRoutes.FINANCIAL}>
              <Landmark />
              <span>Financial</span>
            </a>
          </SidebarMenuButton>
        </SidebarGroup>
       </SidebarContent>
       
      <SidebarFooter>
        <AppUserSidebar/>
      </SidebarFooter>
    </Sidebar>
  );
}
