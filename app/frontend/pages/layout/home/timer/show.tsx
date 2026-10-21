import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { TimerShowProps } from "@/types/timer";
import { PageProps } from "@/types/auth";
import { HomeView } from "@/types/view";
import TimerPage from "./timerPage";
import SidberContainer from "@/pages/layout/sidebar/sidebar-container";
import { Toaster } from "@/components/ui/sonner";
import FlashToast from "@/pages/auth/_components/toast/flash-toast";
import ParameterView from "@/pages/auth/_components/parameter/parameter-view";

export default function Index({ activeSet, serverTime }: TimerShowProps) {
  const { auth } = usePage<PageProps>().props;
  const [view, setView] = useState<HomeView>("timer");

  // ログアウトしたらタイマー画面に戻す(再ログイン時にパラメーターが開いたままにならないように)
  if (!auth.loggedIn && view !== "timer") {
    setView("timer");
  }

  return (
    <div className="bg-[#ebebe2]">
      <FlashToast/>
      <Toaster richColors position="top-center"/>
      <SidberContainer view={view} onViewChange={setView}>
        {/* タイマーの完了判定はTimerPageが担うため、パラメーター表示中もアンマウントせず隠すだけにする */}
        <div className={view === "timer" ? "contents" : "hidden"}>
          <TimerPage activeSet={activeSet} serverTime={serverTime} />
        </div>
        {view === "parameter" && <ParameterView />}
      </SidberContainer>
    </div>
  );
}
