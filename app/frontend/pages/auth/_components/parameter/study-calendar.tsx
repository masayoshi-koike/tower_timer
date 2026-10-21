import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { buildMonthGrid, monthTitle, WEEKDAY_LABELS } from '@/lib/study-calendar';
import { cn } from '@/lib/utils';
import { useStudyCalendar } from '@/pages/hooks/useStudyCalendar';
import CalendarDayCell, { CELL_SIZE_CLASS } from './calendar-day-cell';

interface Props {
  /** 値が変わると再取得する(学習完了でトータルが変わった時など) */
  refreshKey: number;
  className?: string;
}

// 月によって5〜6行になるため、常に6行分の高さを確保して月移動時にレイアウトが動かないようにする
const GRID_CELLS = 42;

// 日付セルと同じ寸法の空白(セルのpx-1も含めて合わせないと、行の高さがずれて帯がはみ出す)
function BlankCell() {
  return (
    <div aria-hidden className="px-1">
      <div className={CELL_SIZE_CLASS} />
    </div>
  );
}

export default function StudyCalendar({ refreshKey, className }: Props) {
  const { data, status, canGoPrev, canGoNext, moveMonth, retry } = useStudyCalendar(refreshKey);

  const grid = useMemo(
    () => (data ? buildMonthGrid(data.month, data.days, data.today) : null),
    [data]
  );

  return (
    <section aria-label="Study calendar" className={cn('w-full max-w-md md:max-w-lg landscape:max-w-md', className)}>
      <header className="mb-4 flex items-center justify-between px-1">
        {data ? (
          <h2 className="text-xl font-semibold text-neutral-900">{monthTitle(data.month)}</h2>
        ) : (
          <Skeleton className="h-7 w-40 bg-neutral-300/60" />
        )}
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Previous month"
            disabled={!canGoPrev}
            onClick={() => moveMonth(-1)}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Next month"
            disabled={!canGoNext}
            onClick={() => moveMonth(1)}
          >
            <ChevronRight />
          </Button>
        </div>
      </header>

      <div
        aria-hidden
        className="mb-2 grid grid-cols-7 text-center text-[11px] font-medium tracking-widest text-neutral-500"
      >
        {WEEKDAY_LABELS.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>

      {grid ? (
        <div
          className={cn(
            'grid grid-cols-7 gap-y-2 transition-opacity',
            status === 'loading' && 'opacity-50'
          )}
        >
          {Array.from({ length: grid.leadingBlanks }, (_, index) => (
            <BlankCell key={`leading-${index}`} />
          ))}
          {grid.days.map((day) => (
            <CalendarDayCell key={day.key} day={day} />
          ))}
          {Array.from({ length: GRID_CELLS - grid.leadingBlanks - grid.days.length }, (_, index) => (
            <BlankCell key={`trailing-${index}`} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-y-2" aria-busy>
          {Array.from({ length: GRID_CELLS }, (_, index) => (
            <div key={index} className="px-1">
              <Skeleton className={cn('w-full rounded-xl bg-white/60', CELL_SIZE_CLASS)} />
            </div>
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 flex items-center justify-center gap-3 text-sm text-neutral-600">
          <span>読み込めませんでした</span>
          <Button variant="outline" size="sm" onClick={retry}>
            再読み込み
          </Button>
        </div>
      )}
    </section>
  );
}
