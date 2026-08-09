import { UsePomodoroTimerProps } from "@/types/timer";
import { useEffect, useState } from "react";

const WORK_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

export default function usePomodoroTimer({ activeSet, onComplete, onReset }: UsePomodoroTimerProps) {
  const isBreakStatus = activeSet?.status === 'break_time' || activeSet?.status === 'break_paused';
  const totalDuration = isBreakStatus ? BREAK_DURATION : WORK_DURATION;
  const [remainingTime, setRemainingTime] = useState(() => {
    if (!activeSet || activeSet.status === 'canceled') {
      return WORK_DURATION;
    }
    if (activeSet.status === 'paused' || activeSet.status === 'break_paused') {
      return Math.max(totalDuration - activeSet.elapsed_time, 0);
    }
    const now = new Date().getTime();
    const resumedAt = activeSet.resumed_at ? new Date(activeSet.resumed_at).getTime() : now;
    const diffInSeconds = Math.floor((now - resumedAt) / 1000);
    const totalElapsed = activeSet.elapsed_time + diffInSeconds;
    return Math.max(totalDuration - totalElapsed, 0);
  });

  useEffect(() => {

    if (!activeSet || activeSet.status === 'canceled') {
      setRemainingTime(WORK_DURATION);
      return;
    }

    if (activeSet.status === 'paused' || activeSet.status === 'break_paused') {
      setRemainingTime(Math.max(totalDuration - activeSet.elapsed_time, 0));
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const resumedAt = activeSet.resumed_at ? new Date(activeSet.resumed_at).getTime() : now;
      
      const diffInSeconds = Math.floor((now - resumedAt) / 1000);
      const totalElapsed = activeSet.elapsed_time + diffInSeconds;
      const newRemaining = Math.max(totalDuration - totalElapsed, 0);

      setRemainingTime(newRemaining);

      if (newRemaining <= 0) {
        clearInterval(interval);
        if (activeSet.status === 'in_progress') {
          onComplete();
        } else if (activeSet.status === 'break_time') {
          onReset();
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [activeSet, totalDuration]);

  const progressPercent = ((totalDuration - remainingTime) / totalDuration) * 100;
  const animationStage = Math.min(Math.floor(progressPercent / 20), 4);
  const isPlaying = activeSet?.status === 'in_progress' || activeSet?.status === 'break_time';

  const isCompleted = activeSet?.is_completed || false;
  const isJustFinished = !isBreakStatus && remainingTime <= 0;
  const isFinished = isCompleted || isJustFinished;

  const showBreakMode = activeSet?.status === 'break_time' || 
                      (activeSet?.status === 'break_paused' && activeSet.elapsed_time > 0);

  return {
    elapsedTime: totalDuration - remainingTime,
    remainingTime,
    animationStage, 
    isPlaying, 
    isBreak: isBreakStatus,  
    isFinished: isFinished,
    showBreakMode: showBreakMode,
    status: activeSet?.status || 'none'
  };
  
  
}