type PomodoroStatus = 'in_progress' | 'completed' | 'canceled' | 'paused' | 'break_time' | 'break_paused';

export interface PomodoroSet {
  id: number;
  target_sessions: number;
  status: PomodoroStatus;
  elapsed_time: number;
  resumed_at: string | null;
  is_completed: boolean;
}

export interface TimerShowProps {
  activeSet: PomodoroSet | null;
  serverTime?: number;
}

export interface UsePomodoroTimerProps {
  activeSet: PomodoroSet | null;
  timeOffset: number;
  onComplete: () => void;
  onReset: () => void;
};