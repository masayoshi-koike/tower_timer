import { useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { HomeView } from "@/types/view";

export const useSidebarModals = (isLoggedIn: boolean, onViewChange: (view: HomeView) => void) => {
  const { setOpenMobile, isMobile } = useSidebar();
  
  const [isLoginRequiredOpen, setIsLoginRequiredOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleTimerClick = () => {
    onViewChange("timer");
    if (isMobile) setOpenMobile(false);
  };

  const handleParameterClick = () => {
    if (isLoggedIn) {
      onViewChange("parameter");
    } else {
      setIsLoginRequiredOpen(true);
    }
    if (isMobile) setOpenMobile(false);
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      setIsUserMenuOpen(true);
    } else {
      setIsLoginOpen(true);
    }
    if (isMobile) setOpenMobile(false);
  };

  const onOpenSignUp = () => {
    setIsSignUpOpen(true);
    setIsLoginOpen(false);
  };

  return {
    state: {
      isLoginRequiredOpen,
      isSignUpOpen,
      isLoginOpen,
      isUserMenuOpen,
    },
    actions: {
      setIsLoginRequiredOpen,
      setIsSignUpOpen,
      setIsLoginOpen,
      setIsUserMenuOpen,
      handleTimerClick,
      handleParameterClick,
      handleLoginClick,
      onOpenSignUp,
    }
  };
};