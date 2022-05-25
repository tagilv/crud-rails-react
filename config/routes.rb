Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'wines/index'
      post 'wines/create'
      delete 'wines/:id', to: 'wines#destroy'
    end
  end

  root 'wines#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
