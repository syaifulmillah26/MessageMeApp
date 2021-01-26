class ApplicationController < ActionController::Base

  include ApplicationHelper

	before_action :configure_permitted_parameters, if: :devise_controller?

	protected 
	
	def configure_permitted_parameters
    	devise_parameter_sanitizer.permit(:sign_up) do |user_params|
		    user_params.permit(:name, :username, :email, :password, :password_confirmation)
		end

		devise_parameter_sanitizer.permit(:account_update) do |user_params|
		    user_params.permit(:name, :username, :email, :password, :password_confirmation, :current_password)
		end
	end

end
