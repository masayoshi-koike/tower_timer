class HomeController < ApplicationController
  def index
    render inertia: 'home/index', props: {
      name: 'Pomodoro User'
    }
  end
end
