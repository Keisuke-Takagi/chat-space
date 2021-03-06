class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]
  @a_group = Group.all
  def index
  end
  def new
    @group = Group.new
    @current_user = current_user
    @group.users << current_user

  end
  def create
    @group = Group.new(group_params)
    if @group.save
      @current_user = current_user
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end
  def edit
    @member = @group.users
    @current_user = current_user 
  end
  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end
  private
  def group_params
    params.require(:group).permit(:name, { :user_ids => [] })
  end
  def set_group
    @group = Group.find(params[:id])
  end
end
