class PomodoroSession < ApplicationRecord
  belongs_to :pomodoro_set

  validates :duration_minutes, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :completed_at, presence: true
end
