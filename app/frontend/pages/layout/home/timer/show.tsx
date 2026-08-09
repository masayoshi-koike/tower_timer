import { TimerShowProps } from "@/types/timer";
import TimerPage from "./timerPage";
import SidberContainer from "@/pages/auth/_components/sidebar/sidebar-container";


export default function Index({activeSet}: TimerShowProps) {
  return (
    <div className="bg-[#ebebe2]">
      <SidberContainer>
        <TimerPage activeSet={activeSet}/>
      </SidberContainer>
    </div>
  );
}