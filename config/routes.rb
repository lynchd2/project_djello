Rails.application.routes.draw do
  devise_for :users

  scope :api do 
    scope :v1 do 
      resources :static_pages, only: [:index]
      resources :boards, only: [:index, :show, :create, :update, :destroy]
      resources :lists, only: [:show, :create, :update, :destroy]
      resources :cards, only: [:show, :create, :update, :destroy]
      resources :users, only: [:show, :index]
    end
  end

  root to: "static_pages#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
