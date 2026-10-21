import { useEffect, useState } from 'react';
import { shiftMonth } from '@/lib/study-calendar';
import { StudyCalendarResponse } from '@/types/study';

type Status = 'loading' | 'ready' | 'error';

/**
 * 月ごとの学習記録を取得する。refreshKeyが変わると(学習完了でトータルが増えた時など)再取得する。
 */
export function useStudyCalendar(refreshKey: number) {
  const [requestedMonth, setRequestedMonth] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [data, setData] = useState<StudyCalendarResponse | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    const controller = new AbortController();
    const query = requestedMonth ? `?month=${requestedMonth}` : '';

    fetch(`/study_calendar${query}`, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load study calendar: ${response.status}`);
        return response.json() as Promise<StudyCalendarResponse>;
      })
      .then((json) => {
        setData(json);
        setStatus('ready');
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        console.error(error);
        setStatus('error');
      });

    return () => controller.abort();
  }, [requestedMonth, refreshKey, retryCount]);

  const month = requestedMonth ?? data?.month ?? null;
  const canGoPrev = !!data && !!month && month > data.minMonth;
  const canGoNext = !!data && !!month && month < data.today.slice(0, 7);

  const moveMonth = (delta: -1 | 1) => {
    if (!month || (delta < 0 ? !canGoPrev : !canGoNext)) return;
    setStatus('loading');
    setRequestedMonth(shiftMonth(month, delta));
  };

  const retry = () => {
    setStatus('loading');
    setRetryCount((count) => count + 1);
  };

  return { data, status, canGoPrev, canGoNext, moveMonth, retry };
}
