class UsersController < ApplicationController
  before_action :authenticate_user!
  
  def index
    search = params[:term].present? ? params[:term] : nil
    @users = if search 
      User.search(search)
    else
      User.where.not(id: current_user).order(created_at: :desc)
    end
    @users
    @friend = Friend.new
  end

  def auto_suggestions
    users = User.all.map{|x| x.name}
    render json: {data:users.as_json},status: :ok
  end

  def show
    @user = User.friendly.find(params[:id])
  end

  def add_friend
    friend_id = params[:id]
    if friend_id.present?
      Friend.create!(friend_id: friend_id, user_id: current_user.id)
      Friend.create!(friend_id: current_user.id, user_id: friend_id)
      redirect_to users_path
      flash[:notice] = "Friend was successfully added."
    end
  end

  def remove_friend
    friend_id = params[:id]
    remove_friend_1 = Friend.where(user_id: current_user.id, friend_id: friend_id)&.first
    remove_friend_2 = Friend.where(user_id: friend_id, friend_id: current_user.id)&.first
    remove_friend_1.destroy
    remove_friend_2.destroy
    redirect_to users_path
    flash[:alert] = "Friend was successfully removed."

  end
end