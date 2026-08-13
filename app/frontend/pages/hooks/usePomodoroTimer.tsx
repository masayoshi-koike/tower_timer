import { UsePomodoroTimerProps } from '@/types/timer';
import { useEffect, useRef, useState } from 'react';

const WORK_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

export default function usePomodoroTimer({
  activeSet,
  timeOffset = 0,
  onComplete,
  onReset,
}: UsePomodoroTimerProps) {
  const isBreakStatus = activeSet?.status === 'break_time' || activeSet?.status === 'break_paused';
  const totalDuration = isBreakStatus ? BREAK_DURATION : WORK_DURATION;

  const onCompleteRef = useRef(onComplete);
  const onResetRef = useRef(onReset);

  useEffect(() => {
    onCompleteRef.current = onComplete;
    onResetRef.current = onReset;
  }, [onComplete, onReset]);

  const [now, setNow] = useState(() => new Date().getTime());

  const currentTimeWithOffset = now + timeOffset;
  
  const remainingTime = (() => {
    if (!activeSet || activeSet.status === 'canceled') {
      return WORK_DURATION;
    }
    if (activeSet.status === 'paused' || activeSet.status === 'break_paused') {
      return Math.max(totalDuration - activeSet.elapsed_time, 0);
    }
    const resumedAt = activeSet.resumed_at
      ? new Date(activeSet.resumed_at).getTime()
      : currentTimeWithOffset;
    const diffInSeconds = Math.max(Math.floor((currentTimeWithOffset - resumedAt) / 1000), 0);
    const totalElapsed = activeSet.elapsed_time + diffInSeconds;
    return Math.max(totalDuration - totalElapsed, 0);
  })();

  useEffect(() => {
    if (
      !activeSet ||
      activeSet.status === 'canceled' ||
      activeSet.status === 'paused' ||
      activeSet.status === 'break_paused'
    ) {
      return;
    }

    const interval = setInterval(() => {
      const currentNow = new Date().getTime();
      setNow(currentNow);

      const timeWithOffset = currentNow + timeOffset;
      const resumedAt = activeSet.resumed_at
        ? new Date(activeSet.resumed_at).getTime()
        : timeWithOffset;

      const diffInSeconds = Math.max(Math.floor((timeWithOffset - resumedAt) / 1000), 0);
      const totalElapsed = activeSet.elapsed_time + diffInSeconds;
      const newRemaining = Math.max(totalDuration - totalElapsed, 0);

      if (newRemaining <= 0) {
        clearInterval(interval);
        if (activeSet.status === 'in_progress') {
          onCompleteRef.current?.();
        } else if (activeSet.status === 'break_time') {
          onResetRef.current?.();
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [activeSet, totalDuration, timeOffset]);

  const progressPercent = ((totalDuration - remainingTime) / totalDuration) * 100;
  const animationStage = Math.min(Math.floor(progressPercent / 20), 4);
  const isPlaying = activeSet?.status === 'in_progress' || activeSet?.status === 'break_time';

  const isCompleted = activeSet?.is_completed || false;
  const isJustFinished = !isBreakStatus && remainingTime <= 0;
  const isFinished = isCompleted || isJustFinished;

  const showBreakMode =
    activeSet?.status === 'break_time' ||
    (activeSet?.status === 'break_paused' && activeSet.elapsed_time > 0);

  return {
    elapsedTime: totalDuration - remainingTime,
    remainingTime,
    animationStage,
    isPlaying,
    isBreak: isBreakStatus,
    isFinished: isFinished,
    showBreakMode: showBreakMode,
    status: activeSet?.status || 'none',
  };
}
