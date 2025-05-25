import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { PageRoutes } from "@/constants/page-routes";
import { Home, Landmark } from "lucide-react";
import Link from "next/link";
import AppMainSidebar from "./app-main-sidebar";
import { AppUserSidebar } from "./app-user-sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-1.5 text-center text-lg font-bold text-black">
        SJDM Christian Ministry
      </SidebarHeader>

      <SidebarContent className="mt-4">
        <SidebarGroup>
          <SidebarMenuButton asChild>
            <Link href={PageRoutes.DASHBOARD}>
              <Home />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarGroup>

        <SidebarGroup>
          <AppMainSidebar />
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenuButton asChild>
            <Link href={PageRoutes.FINANCIAL}>
              <Landmark />
              <span>Financial</span>
            </Link>
          </SidebarMenuButton>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <AppUserSidebar />
      </SidebarFooter>
    </Sidebar>
  );
}
