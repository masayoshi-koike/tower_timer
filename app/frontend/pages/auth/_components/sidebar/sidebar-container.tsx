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
        } as React.CSSProperties
      }
      defaultOpen={false}
    >
      <SidebarMenus />
      <SidebarInset className="relative bg-[#ebebe2] w-full overflow-x-hidden">
        <div className="absolute top-4 left-4 z-50">
          <SidebarTrigger />
        </div>
        <main className="flex-1 flex flex-col">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}