import { TimerShowProps } from "@/types/timer";
import TimerPage from "./timerPage";
import SidberContainer from "@/pages/layout/sidebar/sidebar-container";
import { Toaster } from "@/components/ui/sonner";
import FlashToast from "@/pages/auth/_components/toast/flash-toast";

export default function Index({ activeSet, serverTime }: TimerShowProps) {
  return (
    <div className="bg-[#ebebe2]">
      <FlashToast/>
      <Toaster richColors position="top-center"/>
      <SidberContainer>
        <TimerPage activeSet={activeSet} serverTime={serverTime} />
      </SidberContainer>
    </div>
  );
}