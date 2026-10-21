import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types/auth';
import StudyCalendar from './study-calendar';
import TotalTimePanel from './total-time-panel';

export default function ParameterView() {
  const { auth } = usePage<PageProps>().props;

  return (
    <div className="flex w-full flex-1">
      <div className="m-auto grid w-full max-w-md gap-10 px-6 py-20 md:max-w-lg landscape:max-w-5xl landscape:grid-cols-2 landscape:items-center landscape:gap-10 landscape:p-10">
        <TotalTimePanel totalMinutes={auth.total_minutes} className="landscape:justify-self-center" />
        <StudyCalendar refreshKey={auth.total_minutes} className="landscape:justify-self-center" />
      </div>
    </div>
  );
}
