class PomodoroSet < ApplicationRecord
  belongs_to :user, touch: true
  has_many :pomodoro_sessions, dependent: :destroy

  WORK_DURATION = 25 * 60

  enum :status, { in_progress: 0, completed: 1, canceled: 2, paused: 3, break_time: 4, break_paused: 5 }

  def start!
    new_status = status == 'break_paused' ? :break_time : :in_progress
    update!(status: new_status, resumed_at: Time.current)
  end

  def stop!
    return false unless in_progress? || break_time?

    additional_time = (Time.current - resumed_at).round
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
      pomodoro_sessions.create!(completed_at: finished_at)
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

  private

    # 画面を閉じていた等で完了処理が遅れても、実際に満了した時刻で記録する(日別集計がずれないように)
    def finished_at
      return Time.current unless resumed_at

      [resumed_at + (WORK_DURATION - elapsed_time).seconds, Time.current].min
    end
end
