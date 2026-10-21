import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  status: string;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

const BUTTON_CLASS =
  'h-12 flex-1 rounded-xl px-2 text-xs font-semibold tracking-[0.2em] uppercase min-[400px]:text-sm sm:h-14 sm:min-w-28 sm:flex-none sm:px-8 landscape:max-[1024px]:h-10 landscape:max-[1024px]:min-w-0 landscape:max-[1024px]:flex-1 landscape:max-[1024px]:px-1 landscape:max-[1024px]:text-[11px]';

// 今押すべき主操作は黒、それ以外は白、押せないものは薄く(パラメーターのカレンダーと同じ配色の意味)
const PRIMARY_CLASS = 'bg-neutral-900 text-white hover:bg-neutral-800';
const SECONDARY_CLASS =
  'bg-white text-neutral-900 hover:bg-white/70 disabled:bg-white/40 disabled:text-neutral-400 disabled:opacity-100';

function TimerControls({ status, onStart, onStop, onReset }: Props) {
  const isRunning = status === 'in_progress' || status === 'break_time';

  return (
    <div className="flex w-full justify-center gap-2 px-4 sm:gap-4 sm:px-0 landscape:max-[1024px]:gap-1 landscape:max-[1024px]:px-2">
      <Button
        type="button"
        onClick={onStop}
        disabled={!isRunning}
        className={cn(BUTTON_CLASS, isRunning ? PRIMARY_CLASS : SECONDARY_CLASS)}
      >
        Stop
      </Button>
      <Button
        type="button"
        onClick={onStart}
        disabled={isRunning}
        className={cn(BUTTON_CLASS, isRunning ? SECONDARY_CLASS : PRIMARY_CLASS)}
      >
        Start
      </Button>
      <Button type="button" onClick={onReset} className={cn(BUTTON_CLASS, SECONDARY_CLASS)}>
        Reset
      </Button>
    </div>
  );
}

export default memo(TimerControls);
