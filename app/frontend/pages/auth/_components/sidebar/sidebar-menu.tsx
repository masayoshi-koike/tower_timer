import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChartPie } from "lucide-react";
import LoginPage from "../../../layout/login";
import { useState } from "react";
import TotalTimeModal from "../timer/totalTime-modal";

export default function SidebarMenus() {
  const [isTotalTimeOpen, setIsTotalTimeOpen] = useState(false);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              <SidebarMenuItem>
                <LoginPage />
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  className="h-12 [&>svg]:size-8 w-full 
                  group-data-[collapsible=icon]:!w-13 
                  group-data-[collapsible=icon]:!h-13"
                  onClick={() => setIsTotalTimeOpen(true)}
                  tooltip="パラメーター"
                >
                  <ChartPie />
                  <span className="truncate group-data-[collapsible=icon]:hidden">
                    パラメーター
                  </span>
                </SidebarMenuButton>
                <TotalTimeModal
                  isOpen={isTotalTimeOpen}
                  onOpenChange={() => setIsTotalTimeOpen(false)}
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
