import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types/auth";
import { useState } from "react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { LucideCircleUserRound } from "lucide-react";
import UserMenuModal from "../../auth/_components/userMenu/userMenuModal";
import SignupContainer from "../../auth/_components/signup/signup-container";
import LoginContainer from "../../auth/_components/login/login-container";

export default function LoginPage() {
  const { auth } = usePage<PageProps>().props;
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUserMenuOpen, setisUserMenuOpen] = useState(false);

  const handleButtonClick = () => {
    if (auth.loggedIn) {
      setisUserMenuOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  const onOpenSignUp = () => {
    setIsSignUpOpen(true);
    setIsLoginOpen(false);
  };

  return (
    <>
      <SidebarMenuButton
        className="h-12 [&>svg]:size-8 w-full group-data-[collapsible=icon]:!w-13 group-data-[collapsible=icon]:!h-13"
        onClick={handleButtonClick}
        tooltip={auth.loggedIn ? "ユーザー" : "ログイン"}
      >
        <LucideCircleUserRound />
        <span className="truncate group-data-[collapsible=icon]:hidden">
          {auth.loggedIn ? "ユーザー" : "ログイン"}
        </span>
      </SidebarMenuButton>
      {isUserMenuOpen && (
        <UserMenuModal
          isOpen={isUserMenuOpen}
          onOpenChange={() => setisUserMenuOpen(false)}
        />
      )}
      {isSignUpOpen && (
        <SignupContainer
          isOpen={isSignUpOpen}
          onClose={() => setIsSignUpOpen(false)}
        />
      )}
      {isLoginOpen && (
        <LoginContainer
          isOpen={isLoginOpen}
          onOpenSignUp={onOpenSignUp}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
    </>
  );
}
