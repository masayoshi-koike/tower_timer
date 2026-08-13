import { TimerShowProps } from "@/types/timer";
import usePomodoroTimer from "@/pages/hooks/usePomodoroTimer";
import { useEffect, useState } from "react";
import TimerControls from "@/pages/auth/_components/timer/timer-controles";
import TimerDisplay from "@/pages/auth/_components/timer/timer-display";
import IllustrationArea from "@/pages/auth/_components/illustration/illustration-area";
import BreakTimeArea from "@/pages/auth/_components/illustration/breakTime-area";
import { router } from "@inertiajs/core";

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
        if (url === "/timer/complete") {
          router.reload({ only: ['auth'] });
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
    <div className="flex w-full flex-1 flex-col items-center justify-center overflow-x-hidden px-2 pt-16 sm:px-5 sm:pt-4 landscape:max-[1024px]:pt-1">
      <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-6 min-[1025px]:grid-cols-12 min-[1025px]:gap-1 landscape:max-[1024px]:grid-cols-12 landscape:max-[1024px]:gap-1">
        
        <div className="flex flex-col items-center justify-center p-4 min-[1025px]:col-span-5 landscape:max-[1024px]:col-span-5 landscape:max-[1024px]:p-1">
          <TimerDisplay timeInSeconds={remainingTime} isBreak={isBreak} />
          <TimerControls
            status={status}
            onStart={handleStart}
            onStop={handleStop}
            onReset={handleReset}
          />
        </div>

        <div className="mt-4 flex w-full items-center justify-center px-4 min-[1025px]:col-span-7 min-[1025px]:mt-0 sm:px-0 landscape:max-[1024px]:col-span-7 landscape:max-[1024px]:mt-0">
          <div className="relative aspect-square w-full max-w-90 overflow-hidden border-2 border-gray-900 bg-[#ebebe2] min-[1025px]:max-w-250 landscape:max-[1024px]:max-w-[90vh]">
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
