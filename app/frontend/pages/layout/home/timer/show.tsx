import SidberContainer from "@/pages/auth/_components/sidebar/sidebar-container";
import TimerPage from "./timerPage";

export default function Index() { 
  return (
    <div className="bg-[#ebebe2]">
      <SidberContainer>
        <TimerPage/>
      </SidberContainer>
    </div>
  );
}