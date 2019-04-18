Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resource :app

  resources :contacts do
    get :near_duplicates, on: :collection
  end

  root to: 'app#show'
end
