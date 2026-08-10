import { TimerShowProps } from "@/types/timer";
import usePomodoroTimer from "@/pages/hooks/usePomodoroTimer";
import { useEffect, useState } from "react";
import TimerControls from "@/pages/auth/_components/timer/timer-controles";
import TimerDisplay from "@/pages/auth/_components/timer/timer-display";
import IllustrationArea from "@/pages/auth/_components/illustration/illustration-area";
import BreakTimeArea from "@/pages/auth/_components/illustration/breakTime-area";

export default function TimerPage({
  activeSet: initialActiveSet,
  serverTime: initialServerTime,
}: TimerShowProps) {
  const [activeSet, setActiveSet] = useState(initialActiveSet);
  const [timeOffset, setTimeOffset] = useState(0);

  useEffect(() => {
    if (initialServerTime) {
      const clientTime = new Date().getTime();
      setTimeOffset(initialServerTime - clientTime);
    }
  }, [initialServerTime]);

  const updateTimerState = async (url: string) => {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken || "",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setActiveSet(data.activeSet);
        if (data.serverTime) {
          const clientTime = new Date().getTime();
          setTimeOffset(data.serverTime - clientTime);
        }
      }
    } catch (error) {
      console.error("Timer action failed:", error);
    }
  };

  const handleStart = () => updateTimerState("/timer/start");
  const handleStop = () => updateTimerState("/timer/stop");
  const handleReset = () => updateTimerState("/timer/reset");

  const {
    elapsedTime,
    remainingTime,
    animationStage,
    isPlaying,
    isBreak,
    isFinished,
    showBreakMode,
    status,
  } = usePomodoroTimer({
    activeSet,
    timeOffset,
    onComplete: () => updateTimerState("/timer/complete"),
    onReset: () => updateTimerState("/timer/reset"),
  });

  return (
    <div className="flex-1 flex items-center justify-center w-full pr-5">
      <div className="w-full max-w-7xl grid grid-cols-1 min-[1025px]:grid-cols-12 gap-1 items-center">
        <div className="min-[1025px]:col-span-5 flex flex-col items-center justify-center p-4">
          <TimerDisplay timeInSeconds={remainingTime} isBreak={isBreak} />
          <TimerControls
            status={status}
            onStart={handleStart}
            onStop={handleStop}
            onReset={handleReset}
          />
        </div>

        <div className="min-[1025px]:col-span-7 flex items-center justify-center w-full p-4">
          <div className="relative max-w-full w-[400px] min-[1025px]:w-[1000px] aspect-square border-2 border-gray-900 overflow-hidden bg-[#ebebe2]">
            {showBreakMode ? (
              <BreakTimeArea
                elapsedTime={elapsedTime}
                status={status}
                isPlaying={isPlaying}
                isBreak={isBreak}
              />
            ) : (
              <IllustrationArea
                elapsedTime={elapsedTime}
                status={status}
                stage={animationStage}
                isPlaying={isPlaying}
                isFinished={isFinished}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
