class UserSessionsController < ApplicationController
  skip_before_action :require_login, only: [:create]

  def create
    @user = User.find_by(email: params[:email])&.authenticate(params[:password])

    if @user
      session[:user_id] = @user.id
      redirect_to root_path
    else
      redirect_back fallback_location: root_path, 
                    inertia: { errors: {
                      base: 'メールアドレスまたはパスワードが間違っています。'
                    } }
    end
  end

  def destroy
    logout
    redirect_to root_path, status: :see_other
  end
end
