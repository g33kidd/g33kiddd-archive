defmodule SiteWeb.Resolvers.Blog do
  alias Site.Blog

  def create_post(_parent, post_params, _resolution) do
    Blog.create_post(post_params)
  end

  def list_posts(_parent, _args, _resolution) do
    {:ok, Blog.list_posts()}
  end

  def list_published_posts(_parent, _args, _resolution) do
    {:ok, Blog.list_published_posts()}
  end

  def find_post(_parent, %{slug: slug}, _resolution) do
    {:ok, Blog.find_post_by_slug(slug)}
  end

  def on_post_created(post, _args, _resolution) do
    {:ok, post}
  end
end
