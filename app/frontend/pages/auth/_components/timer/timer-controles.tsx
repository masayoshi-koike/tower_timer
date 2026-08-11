import { Button } from "@/components/ui/button";

interface Props {
  status: string;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

export default function TimerControls({
  status,
  onStart,
  onStop,
  onReset,
}: Props) {
  const isRunning = status === "in_progress" || status === "break_time";

  return (
    <div className="flex justify-center w-full gap-2 sm:gap-4 px-4 sm:px-0 landscape:max-[1024px]:gap-1 landscape:max-[1024px]:px-2">
      <Button
        type="button"
        onClick={onStop}
        disabled={!isRunning}
        variant="outline"
        className="rounded-full flex-1 sm:flex-none landscape:max-[1024px]:flex-1 px-2 sm:px-[30px] landscape:max-[1024px]:px-1 py-4 sm:py-[17px] landscape:max-[1024px]:py-2 border-2 border-gray-900 font-custom uppercase tracking-wider bg-[#ebebe2] text-[10px] min-[400px]:text-xs sm:text-base landscape:max-[1024px]:text-[9px]"
      >
        Stop
      </Button>
      <Button
        type="button"
        onClick={onStart}
        disabled={isRunning}
        variant="outline"
        className="rounded-full flex-1 sm:flex-none landscape:max-[1024px]:flex-1 px-2 sm:px-[24px] landscape:max-[1024px]:px-1 py-4 sm:py-[17px] landscape:max-[1024px]:py-2 border-2 border-gray-900 font-custom uppercase tracking-wider bg-[#ebebe2] text-[10px] min-[400px]:text-xs sm:text-base landscape:max-[1024px]:text-[9px]"
      >
        Start
      </Button>
      <Button
        type="button"
        onClick={onReset}
        variant="outline"
        className="rounded-full flex-1 sm:flex-none landscape:max-[1024px]:flex-1 px-2 sm:px-[24px] landscape:max-[1024px]:px-1 py-4 sm:py-[17px] landscape:max-[1024px]:py-2 border-2 border-gray-900 font-custom uppercase tracking-wider bg-[#ebebe2] text-[10px] min-[400px]:text-xs sm:text-base landscape:max-[1024px]:text-[9px]"
      >
        Reset
      </Button>
    </div>
  );
}
