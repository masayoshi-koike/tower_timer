import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";
import SidebarMenus from "./sidebar-menu";

interface AppLayoutProps {
  children: ReactNode;
}

export default function SidberContainer({ children }: AppLayoutProps) {

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
      <SidebarMenus />
      <SidebarInset className="relative w-full overflow-x-hidden bg-[#ebebe2]">
        <div className="absolute top-4 left-4 z-50">
          <SidebarTrigger />
        </div>
        <main className="flex flex-1 flex-col">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}