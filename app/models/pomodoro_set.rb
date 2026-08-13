class PomodoroSet < ApplicationRecord
  belongs_to :user
  has_many :pomodoro_sessions, dependent: :destroy

  enum :status, { in_progress: 0, completed: 1, canceled: 2, paused: 3, break_time: 4, break_paused: 5 }

  def start!
    new_status = status == 'break_paused' ? :break_time : :in_progress
    update!(status: new_status, resumed_at: Time.current)
  end

  def stop!
    return false unless in_progress? || break_time?

    additional_time = (Time.current - resumed_at).to_i
    new_status = break_time? ? :break_paused : :paused

    update!(
      status: new_status,
      elapsed_time: elapsed_time + additional_time,
      resumed_at: nil
    )
  end

  def complete_session!
    return false unless in_progress?

    transaction do
      pomodoro_sessions.create!(completed_at: Time.current)
      update!(
        status: :break_paused,
        elapsed_time: 0,
        resumed_at: nil
      )
    end
  end

  def cancel!
    update!(status: :canceled)
  end
end
