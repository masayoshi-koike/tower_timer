class UsersController < ApplicationController
  skip_before_action :require_login, only: [:create]
  wrap_parameters :user, include: %i[name email password password_confirmation]

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path, flash: { success: "登録が完了しました" }
    else
      formatted_errors = @user.errors.attribute_names.index_with do |attribute|
        @user.errors.full_messages_for(attribute).first
      end
      redirect_back_or_to(root_path, inertia: { errors: formatted_errors })
    end
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
