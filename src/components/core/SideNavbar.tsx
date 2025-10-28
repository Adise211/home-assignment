import { Link, useLocation } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/store";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Home, Settings, Table, Database, User } from "lucide-react";

export function SideNavbar() {
  const location = useLocation();
  const { isTableConfigPageEnabled } = useSelector(
    (state: RootState) => state.featureFlags
  );

  const navigationItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Admin Panel",
      url: "/adminPanel",
      icon: User,
    },
    {
      title: "Data Table",
      url: "/dataTable",
      icon: Table,
    },
    // Only include Table Config if it's enabled
    ...(isTableConfigPageEnabled
      ? [
          {
            title: "Table Config",
            url: "/tableConfig",
            icon: Settings,
          },
        ]
      : []),
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Database className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Epiq Assignment</span>
            <span className="truncate text-xs text-muted-foreground">
              Home Assignment
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link to={item.url}>
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <div className="p-2">
          <div className="text-xs text-muted-foreground">Built by Adise</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
