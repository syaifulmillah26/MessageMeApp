class FriendsController < ApplicationController
  before_action :authenticate_user!
  def index
    @friends = Friend.where(user_id: current_user.id).order(created_at: :desc)
  end

end