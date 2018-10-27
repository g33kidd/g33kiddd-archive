defmodule SiteWeb.Resolvers.Blog do
  alias Site.Blog

  def create_post(_parent, %{title: title, body: body}, _resolution) do
    {:ok, %{title: title, body: body}}
  end

  def list_posts(_parent, _args, _resolution) do
    {:ok, Blog.list_posts()}
  end

  def list_published_posts(_parent, _args, _resolution) do
    {:ok, Blog.list_published_posts()}
  end

  def on_post_created(post, _args, _resolution) do
    {:ok, post}
  end
end
