defmodule SiteWeb.Router do
  use SiteWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  # GraphQL API endpoint.
  forward "/api", Absinthe.Plug, schema: SiteWeb.Schema

  # GraphiQL development endpoint.
  if Mix.env() == :dev do
    forward "/gql", Absinthe.Plug.GraphiQL, schema: SiteWeb.Schema
  end

  scope "/", SiteWeb do
    pipe_through :browser

    get "/*all", PageController, :index
  end
end
