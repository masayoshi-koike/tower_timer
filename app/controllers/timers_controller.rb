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
    @active_timer.start!
    
    render_active_timer
  end

  def stop
    @active_timer&.stop!
    
    render_active_timer
  end

  def reset
    @active_timer&.cancel!
    
    render json: { 
      activeSet: nil,
      serverTime: (Time.current.to_f * 1000).to_i
    }
  end

  def complete
    @active_timer&.complete_session!
    
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
    
    @active_timer.as_json(
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
