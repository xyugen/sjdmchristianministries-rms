import { Home, ChevronRight, FolderDown } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { PageRoutes } from "@/constants/page-routes";

const RecordMenuItems = [
  {
    title: "Records",
    icon: FolderDown,
    isActive: false,
    items: [
      {
        title: "Administrative",
        url: "#",
      },
      {
        title: "Human Resources",
        url: "#",
      },
      {
        title: "Financial",
        url: "#",
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="text-lg text-center font-medium p-1.5">SJDM Christian Ministry</SidebarHeader>
      <SidebarContent className="mt-4">
        <SidebarGroup className="text-base pb-0">
          <SidebarMenuButton asChild>
            <a href={PageRoutes.DASHBOARD}>
              <Home />
              <span>Dashboard</span>
            </a>
          </SidebarMenuButton>
        </SidebarGroup>

        <SidebarGroup className="text-base pt-0">
          <SidebarMenu>
            {RecordMenuItems.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
