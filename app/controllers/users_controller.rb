class UsersController < ApplicationController
  before_action :set_user, only: %i(edit update)

  def index
    @users = User.where('name LIKE(?) and id != ? ', "%#{params[:keyword]}%", current_user.id)
    respond_to do |format|
     format.html
     format.json
    end
  end

  def update
    if @users.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
  def set_user
    @user = User.find(params[:id])
  end
end

