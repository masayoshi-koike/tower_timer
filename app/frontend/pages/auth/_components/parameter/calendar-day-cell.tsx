import { memo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarDay, formatDuration } from '@/lib/study-calendar';
import { cn } from '@/lib/utils';

interface Props {
  day: CalendarDay;
}

const BAND_CLASS = 'absolute inset-y-0 bg-[#d9d3c8]';

/** 日付セルの縦横比。スマホを横向きにした時など高さが足りない場合は低くする */
export const CELL_SIZE_CLASS = 'aspect-[5/6] [@media(max-height:500px)]:aspect-[3/2]';

function CalendarDayCell({ day }: Props) {
  const cardClass = cn(
    'relative z-10 flex w-full items-center justify-center rounded-xl text-sm font-medium tabular-nums',
    CELL_SIZE_CLASS,
    day.studied && day.isRunEdge && 'bg-neutral-900 text-white',
    day.studied && !day.isRunEdge && 'bg-transparent text-neutral-900',
    !day.studied && !day.isFuture && 'bg-white text-neutral-900',
    !day.studied && day.isFuture && 'bg-white/40 text-neutral-400',
    day.isToday && 'outline-1 outline-offset-2 outline-neutral-900/60'
  );

  const content = (
    <span className="flex flex-col items-center gap-1">
      {day.day}
      <span
        aria-hidden
        className={cn('size-1 rounded-full', day.studied ? 'bg-current' : 'bg-transparent')}
      />
    </span>
  );

  return (
    <div className="relative px-1">
      {day.bandToPrev && <span aria-hidden className={cn(BAND_CLASS, 'right-1/2 left-0')} />}
      {day.bandToNext && <span aria-hidden className={cn(BAND_CLASS, 'right-0 left-1/2')} />}

      {day.studied ? (
        <Popover>
          <PopoverTrigger
            openOnHover
            delay={50}
            closeDelay={50}
            aria-label={`${day.day}, ${formatDuration(day.minutes)}`}
            className={cn(cardClass, 'cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40')}
          >
            {content}
          </PopoverTrigger>
          <PopoverContent
            side="top"
            sideOffset={6}
            className="w-auto rounded-full bg-neutral-900 px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white ring-0"
          >
            {formatDuration(day.minutes)}
          </PopoverContent>
        </Popover>
      ) : (
        <div className={cardClass}>{content}</div>
      )}
    </div>
  );
}

export default memo(CalendarDayCell);
