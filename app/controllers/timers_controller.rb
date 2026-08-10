class TimersController < ApplicationController
  skip_before_action :require_login
  before_action :set_active_timer

  def show
    render inertia: 'layout/home/timer/show', props: {
      activeSet: serialized_active_timer,
      serverTime: (Time.current.to_f * 1000).to_i
    }
  end

  def start
    @active_timer ||= current_user.pomodoro_sets.create!(status: :paused)

    new_status = @active_timer.status == 'break_paused' ? :break_time : :in_progress

    @active_timer.update!(
      status: new_status,
      resumed_at: Time.current
    )
    render_active_timer
  end

  def stop
    return unless @active_timer&.in_progress? || @active_timer&.break_time?

    additional_time = (Time.current - @active_timer.resumed_at).to_i
    new_status = @active_timer.break_time? ? :break_paused : :paused

    @active_timer.update!(
      status: new_status,
      elapsed_time: @active_timer.elapsed_time + additional_time,
      resumed_at: nil
    )
    render_active_timer
  end

  def reset
    if @active_timer
      @active_timer.update!(status: :canceled)
    end
    render json: { 
      activeSet: nil,
      serverTime: (Time.current.to_f * 1000).to_i
   }
  end

  def complete
    return unless @active_timer&.in_progress?

    ActiveRecord::Base.transaction do

      @active_timer.pomodoro_sessions.create!(completed_at: Time.current)
      
      @active_timer.update!(
        status: :break_paused,
        elapsed_time: 0,
        resumed_at: nil
      )
    end
    render_active_timer
  end

  private

  def set_active_timer
    @active_timer = current_user.pomodoro_sets
                                .where(status: [:in_progress, :paused, :break_time, :break_paused])
                                .order(:created_at)
                                .last
  end

  def serialized_active_timer
    return nil unless @active_timer
    @active_timer&.as_json(
      only: [:id, :status, :elapsed_time, :resumed_at, :target_sessions]
    ).merge(
      'is_completed' => @active_timer.pomodoro_sessions.exists?
    )
  end

  def render_active_timer
    render json: { 
      activeSet: serialized_active_timer,
      serverTime: (Time.current.to_f * 1000).to_i
     }
  end
end
