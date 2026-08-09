class ApplicationController < ActionController::Base
  allow_browser versions: :modern
  before_action :require_login

  inertia_share do
    {
      auth: {
        user: current_user,
        loggedIn: logged_in?,
      }
    }
  end

  def logged_in?
    !!current_user && current_user.general?
  end

  def logout
    session[:user_id] = nil
    @current_user = nil
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]

    if @current_user.nil?
      @current_user = User.create_guest!
      session[:user_id] = @current_user.id
    end

    @current_user
  end

  private

  def require_login
    redirect_to root_path unless logged_in?
  end
end

