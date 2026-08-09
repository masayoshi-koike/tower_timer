class TimersController < ApplicationController
  skip_before_action :require_login
  def show
    render inertia: 'layout/home/timer/show'
  end
end
