export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

const DAYS_PER_WEEK = WEEKDAY_LABELS.length;

export interface CalendarDay {
  /** YYYY-MM-DD */
  key: string;
  day: number;
  minutes: number;
  studied: boolean;
  isToday: boolean;
  isFuture: boolean;
  /** 連続して学習した区間の始点・終点・単独日 (黒で塗る日) */
  isRunEdge: boolean;
  /** 前日・翌日と帯でつなぐか */
  bandToPrev: boolean;
  bandToNext: boolean;
}

export interface CalendarGrid {
  leadingBlanks: number;
  days: CalendarDay[];
}

export function splitMinutes(totalMinutes: number) {
  return { hours: Math.floor(totalMinutes / 60), minutes: totalMinutes % 60 };
}

export function formatDuration(totalMinutes: number): string {
  const { hours, minutes } = splitMinutes(totalMinutes);

  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

function parseMonthKey(monthKey: string) {
  const [year, month] = monthKey.split('-').map(Number);

  return { year, month };
}

export function monthTitle(monthKey: string): string {
  const { year, month } = parseMonthKey(monthKey);

  return `${MONTH_NAMES[month - 1]} ${year}`;
}

export function shiftMonth(monthKey: string, delta: number): string {
  const { year, month } = parseMonthKey(monthKey);
  const shifted = new Date(year, month - 1 + delta, 1);

  return `${shifted.getFullYear()}-${String(shifted.getMonth() + 1).padStart(2, '0')}`;
}

export function buildMonthGrid(
  monthKey: string,
  minutesByDate: Record<string, number>,
  today: string
): CalendarGrid {
  const { year, month } = parseMonthKey(monthKey);
  const leadingBlanks = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const dayKey = (day: number) => `${monthKey}-${String(day).padStart(2, '0')}`;
  const minutesOf = (day: number) => (day >= 1 && day <= daysInMonth ? (minutesByDate[dayKey(day)] ?? 0) : 0);

  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const key = dayKey(day);
    const column = (leadingBlanks + index) % DAYS_PER_WEEK;
    const minutes = minutesOf(day);
    const studied = minutes > 0;
    const prevStudied = minutesOf(day - 1) > 0;
    const nextStudied = minutesOf(day + 1) > 0;
    const isRunEdge = studied && (!prevStudied || !nextStudied);

    return {
      key,
      day,
      minutes,
      studied,
      isToday: key === today,
      isFuture: key > today,
      isRunEdge,
      // 週をまたぐ位置では、途中の日だけ帯を行の端まで伸ばす(始点・終点は黒いカードで受ける)
      bandToPrev: studied && prevStudied && (column > 0 || !isRunEdge),
      bandToNext: studied && nextStudied && (column < DAYS_PER_WEEK - 1 || !isRunEdge),
    };
  });

  return { leadingBlanks, days };
}
