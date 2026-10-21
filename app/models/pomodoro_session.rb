class PomodoroSession < ApplicationRecord
  belongs_to :pomodoro_set

  validates :duration_minutes, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :completed_at, presence: true

  # completed_atをアプリのタイムゾーン(config.time_zone)の日付ごとに集計し、{ Date => 分 } を返す
  def self.minutes_by_date
    zone = connection.quote(Time.zone.tzinfo.name)
    local_date = Arel.sql("DATE(pomodoro_sessions.completed_at AT TIME ZONE 'UTC' AT TIME ZONE #{zone})")

    group(local_date).sum(:duration_minutes)
  end
end
