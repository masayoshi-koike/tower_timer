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
    <div className="flex justify-center w-full gap-2 sm:gap-4 px-4 sm:px-0">
      <Button
        type="button"
        onClick={onStop}
        disabled={!isRunning}
        variant="outline"
        className="rounded-full flex-1 sm:flex-none px-2 sm:px-[30px] py-4 sm:py-[17px] border-2 border-gray-900 font-custom uppercase tracking-wider bg-[#ebebe2] text-[10px] min-[400px]:text-xs sm:text-base"
      >
        Stop
      </Button>
      <Button
        type="button"
        onClick={onStart}
        disabled={isRunning}
        variant="outline"
        className="rounded-full flex-1 sm:flex-none px-2 sm:px-[24px] py-4 sm:py-[17px] border-2 border-gray-900 font-custom uppercase tracking-wider bg-[#ebebe2] text-[10px] min-[400px]:text-xs sm:text-base"
      >
        Start
      </Button>
      <Button
        type="button"
        onClick={onReset}
        variant="outline"
        className="rounded-full flex-1 sm:flex-none px-2 sm:px-[24px] py-4 sm:py-[17px] border-2 border-gray-900 font-custom uppercase tracking-wider bg-[#ebebe2] text-[10px] min-[400px]:text-xs sm:text-base"
      >
        Reset
      </Button>
    </div>
  );
}
