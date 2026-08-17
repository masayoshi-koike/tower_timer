import { TimerShowProps } from "@/types/timer";
import TimerPage from "./timerPage";
import SidberContainer from "@/pages/layout/sidebar/sidebar-container";
import SignUpToast from "@/pages/auth/_components/signup/signup-toast";
import { Toaster } from "@/components/ui/sonner";

export default function Index({ activeSet, serverTime }: TimerShowProps) {
  return (
    <div className="bg-[#ebebe2]">
      <SignUpToast/>
      <Toaster richColors position="top-center"/>
      <SidberContainer>
        <TimerPage activeSet={activeSet} serverTime={serverTime} />
      </SidberContainer>
    </div>
  );
}