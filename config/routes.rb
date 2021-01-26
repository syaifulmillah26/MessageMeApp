Rails.application.routes.draw do

  mount ActionCable.server, at: '/cable'

  resources :messages do
    collection do
      get :get_user
      post :create_message
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'
  devise_for :users, 
    path: 'auth', 
    path_names: { 
      sign_in: 'login', 
      sign_out: 'logout', 
      password: 'secret', 
      confirmation: 'verification', 
      unlock: 'unblock', 
      registration: 'register', 
      sign_up: 'cmon_let_me_in' }
  
  get 'friends', to: 'friends#index'    
  get 'users', to: 'users#index'
  resources :users do
    member do
      get :add_friend
      get :remove_friend
    end
  end
end
