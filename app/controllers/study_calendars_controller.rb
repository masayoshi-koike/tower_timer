class StudyCalendarsController < ApplicationController
  skip_before_action :require_login
  before_action :require_general_user

  MONTH_FORMAT = /\A\d{4}-(0[1-9]|1[0-2])\z/

  def show
    month = target_month

    render json: {
      month: month.strftime('%Y-%m'),
      today: today.iso8601,
      minMonth: min_month.strftime('%Y-%m'),
      days: minutes_by_day(month)
    }
  end

  private

    def require_general_user
      head :unauthorized unless logged_in?
    end

    def today
      Time.zone.today
    end

    def min_month
      current_user.created_at.to_date.beginning_of_month
    end

    # 登録月より前・今月より先は指定されても範囲内に丸める
    def target_month
      requested = params[:month].to_s.match?(MONTH_FORMAT) ? Date.strptime(params[:month], '%Y-%m') : today

      requested.beginning_of_month.clamp(min_month, today.beginning_of_month)
    end

    def minutes_by_day(month)
      current_user.pomodoro_sessions
                  .where(completed_at: month.beginning_of_day..month.end_of_month.end_of_day)
                  .minutes_by_date
                  .transform_keys(&:iso8601)
    end
end
