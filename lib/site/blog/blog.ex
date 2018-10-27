defmodule Site.Blog do
  alias Site.Repo
  alias Site.Blog.Post

  def list_posts do
    Post |> Repo.all()
  end

  def list_published_posts do
    Post |> Post.published() |> Repo.all()
  end
end
