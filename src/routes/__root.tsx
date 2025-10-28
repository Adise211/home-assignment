import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SideNavbar } from "@/components/core/SideNavbar";

const RootLayout = () => (
  <SidebarProvider>
    <SideNavbar />
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Epiq Assignment</h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Outlet />
      </div>
    </SidebarInset>
    <TanStackRouterDevtools />
  </SidebarProvider>
);

export const Route = createRootRoute({ component: RootLayout });
