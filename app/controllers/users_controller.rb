class UsersController < ApplicationController
  def index
    @users = User.includes(:group_users)
  end
  def edit
  end
  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def serach
    @users = Search.where('name LIKE(?)', "%#{params[:keyword]}%")
    respond_to do |format|
      format.html 
      format.json 
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
