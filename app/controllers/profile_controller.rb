class ProfileController < ApplicationController
  before_action :authenticate_user!
  def index
    @posts = Post.where(user: current_user).order("created_at DESC")
  end
end