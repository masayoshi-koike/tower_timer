class PomodoroSet < ApplicationRecord
  belongs_to :user
  has_many :pomodoro_sessions, dependent: :destroy

  enum status: { in_progress: 0, completed: 1, canceled: 2, paused: 3, break_time: 4, break_paused: 5 }
end
