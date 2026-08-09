class HomeController < ApplicationController
  skip_before_action :require_login
  def index
    render inertia: 'layout/home/index', props: {
      name: 'Pomodoro User'
    }
  end
end
