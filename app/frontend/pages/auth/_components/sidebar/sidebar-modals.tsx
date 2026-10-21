import LoginContainer from '../login/login-container';
import SignupContainer from '../signup/signup-container';
import LoginRequiredModal from './login-required-modal';
import UserMenuModal from '../userMenu/userMenuModal';


type SidebarModalsProps = {
  state: ReturnType<typeof import('../../../hooks/useSidebarModals').useSidebarModals>['state'];
  actions: ReturnType<typeof import('../../../hooks/useSidebarModals').useSidebarModals>['actions'];
};

export function SidebarModals({ state, actions }: SidebarModalsProps) {
  return (
    <>
      <LoginRequiredModal
        isOpen={state.isLoginRequiredOpen}
        onOpenChange={actions.setIsLoginRequiredOpen}
      />
      
      {state.isUserMenuOpen && (
        <UserMenuModal
          isOpen={state.isUserMenuOpen}
          onOpenChange={() => actions.setIsUserMenuOpen(false)}
        />
      )}
      
      {state.isSignUpOpen && (
        <SignupContainer
          isOpen={state.isSignUpOpen}
          onClose={() => actions.setIsSignUpOpen(false)}
        />
      )}
      
      {state.isLoginOpen && (
        <LoginContainer
          isOpen={state.isLoginOpen}
          onOpenSignUp={actions.onOpenSignUp}
          onClose={() => actions.setIsLoginOpen(false)}
        />
      )}
    </>
  );
}