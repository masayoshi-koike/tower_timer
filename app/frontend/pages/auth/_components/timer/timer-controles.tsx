import { memo } from 'react';

interface Props {
  status: string;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

function TimerControls({ status, onStart, onStop, onReset }: Props) {
  const isRunning = status === 'in_progress' || status === 'break_time';

  return (
    <div className="flex w-full justify-center gap-2 px-4 sm:gap-4 sm:px-0 landscape:max-[1024px]:gap-1 landscape:max-[1024px]:px-2">
      <button
        type="button"
        onClick={onStop}
        disabled={!isRunning}
        className={`nes-btn flex-1 border-2 border-gray-900 bg-[#ebebe2] px-2 py-4 font-custom text-[10px] tracking-wider uppercase min-[400px]:text-xs sm:flex-none sm:px-[30px] sm:py-[17px] sm:text-base landscape:max-[1024px]:flex-1 landscape:max-[1024px]:px-1 landscape:max-[1024px]:py-2 landscape:max-[1024px]:text-[9px] ${
          !isRunning ? 'is-disabled disabled:pointer-events-none' : ''
        }`}
      >
        Stop
      </button>
      <button
        type="button"
        onClick={onStart}
        disabled={isRunning}
        className={`nes-btn flex-1 border-2 border-gray-900 bg-[#ebebe2] px-2 py-4 font-custom text-[10px] tracking-wider uppercase min-[400px]:text-xs sm:flex-none sm:px-6 sm:py-[17px] sm:text-base landscape:max-[1024px]:flex-1 landscape:max-[1024px]:px-1 landscape:max-[1024px]:py-2 landscape:max-[1024px]:text-[9px] ${
          isRunning ? 'is-disabled disabled:pointer-events-none' : ''
        }`}
      >
        Start
      </button>
      <button
        type="button"
        onClick={onReset}
        className="nes-btn flex-1 border-2 border-gray-900 bg-[#ebebe2] px-2 py-4 font-custom text-[10px] tracking-wider uppercase min-[400px]:text-xs sm:flex-none sm:px-6 sm:py-[17px] sm:text-base landscape:max-[1024px]:flex-1 landscape:max-[1024px]:px-1 landscape:max-[1024px]:py-2 landscape:max-[1024px]:text-[9px]"
      >
        Reset
      </button>
    </div>
  );
}

export default memo(TimerControls);
