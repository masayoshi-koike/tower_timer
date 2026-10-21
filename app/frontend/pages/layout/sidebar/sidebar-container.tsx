import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";
import SidebarMenus from "./sidebar-menu";
import { HomeView } from "@/types/view";

interface AppLayoutProps {
  children: ReactNode;
  view: HomeView;
  onViewChange: (view: HomeView) => void;
}

export default function SidberContainer({ children, view, onViewChange }: AppLayoutProps) {

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "10rem",
          "--sidebar-width-icon": "4rem",
          "--sidebar-width-mobile": "10rem",
        } as React.CSSProperties
      }
      defaultOpen={false}
    >
      <SidebarMenus view={view} onViewChange={onViewChange} />
      <SidebarInset className="relative w-full overflow-x-hidden bg-[#ebebe2]">
        <div className="absolute top-4 left-4 z-50">
          <SidebarTrigger />
        </div>
        <main className="flex flex-1 flex-col">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}