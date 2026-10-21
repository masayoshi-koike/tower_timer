import { memo } from "react";

interface Props {
  timeInSeconds: number;
  isBreak: boolean;
}

function TimerDisplay({
  timeInSeconds,
  isBreak,
}: Props) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="mb-4 pb-4 text-center sm:mb-8 sm:pb-8 landscape:max-[1024px]:mb-1 landscape:max-[1024px]:pb-1">
      <p className="text-xs font-medium tracking-[0.3em] text-neutral-500 uppercase landscape:max-[1024px]:text-[10px]">
        {isBreak ? "Break" : "Focus"}
      </p>
      <p className="mt-2 text-6xl leading-none font-bold tracking-tight text-neutral-900 tabular-nums min-[400px]:text-7xl sm:mt-3 sm:text-8xl landscape:max-[1024px]:mt-1 landscape:max-[1024px]:text-5xl">
        {formattedTime}
      </p>
    </div>
  );
}

export default memo(TimerDisplay)
