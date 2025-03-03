import { Home } from "lucide-react";

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

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-1.5 text-center text-lg font-medium">
        SJDM Christian Ministry
      </SidebarHeader>
      <SidebarContent className="mt-4">
        <SidebarGroup className="pb-0 text-base">
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
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
