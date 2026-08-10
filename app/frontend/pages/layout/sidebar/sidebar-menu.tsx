import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChartPie, LucideCircleUserRound } from "lucide-react";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types/auth";

import { useSidebarModals } from "@/pages/hooks/useSidebarModals"; 
import { SidebarModals } from "@/pages/auth/_components/sidebar/sidebar-modals";         

const MENU_BUTTON_CLASS = "h-12 [&>svg]:size-8 w-full group-data-[collapsible=icon]:!w-13 group-data-[collapsible=icon]:!h-13";

export default function SidebarMenus() {
  const { auth } = usePage<PageProps>().props;
  
  const { state, actions } = useSidebarModals(auth.loggedIn);

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-4">
                
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={MENU_BUTTON_CLASS}
                    onClick={actions.handleLoginClick}
                    tooltip={auth.loggedIn ? "ユーザー" : "ログイン"}
                  >
                    <LucideCircleUserRound />
                    <span className="truncate group-data-[collapsible=icon]:hidden">
                      {auth.loggedIn ? "ユーザー" : "ログイン"}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={MENU_BUTTON_CLASS}
                    onClick={actions.handleTotalTimeClick}
                    tooltip="パラメーター"
                  >
                    <ChartPie />
                    <span className="truncate group-data-[collapsible=icon]:hidden">
                      パラメーター
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarModals state={state} actions={actions} />
    </>
  );
}