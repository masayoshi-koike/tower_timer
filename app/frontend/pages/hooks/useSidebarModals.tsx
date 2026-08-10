import { useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";

export const useSidebarModals = (isLoggedIn: boolean) => {
  const { setOpenMobile, isMobile } = useSidebar();
  
  const [isTotalTimeOpen, setIsTotalTimeOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleTotalTimeClick = () => {
    setIsTotalTimeOpen(true);
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
      isTotalTimeOpen,
      isSignUpOpen,
      isLoginOpen,
      isUserMenuOpen,
    },
    actions: {
      setIsTotalTimeOpen,
      setIsSignUpOpen,
      setIsLoginOpen,
      setIsUserMenuOpen,
      handleTotalTimeClick,
      handleLoginClick,
      onOpenSignUp,
    }
  };
};