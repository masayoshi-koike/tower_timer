import { splitMinutes } from '@/lib/study-calendar';
import { cn } from '@/lib/utils';

interface Props {
  totalMinutes: number;
  className?: string;
}

const NUMBER_CLASS = 'text-6xl leading-none sm:text-7xl md:text-8xl';
const UNIT_CLASS = 'text-2xl font-medium text-neutral-500';

export default function TotalTimePanel({ totalMinutes, className }: Props) {
  const { hours, minutes } = splitMinutes(totalMinutes);

  return (
    <section aria-label="Total time" className={cn('w-full', className)}>
      <h2 className="text-xs font-medium tracking-[0.3em] text-neutral-500 uppercase">Total Time</h2>
      <p className="mt-3 flex flex-wrap items-baseline gap-x-2 font-bold tracking-tight text-neutral-900 tabular-nums">
        <span className={NUMBER_CLASS}>{hours}</span>
        <span className={UNIT_CLASS}>h</span>
        <span className={cn(NUMBER_CLASS, 'ml-3')}>{minutes}</span>
        <span className={UNIT_CLASS}>m</span>
      </p>
    </section>
  );
}
