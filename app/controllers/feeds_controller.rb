class FeedsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @pagy, @posts = pagy(Post.all, items: 12)
  end

end