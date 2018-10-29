defmodule Site.Blog do
  alias Site.Repo
  alias Site.Blog.Post

  def list_posts do
    Post
    |> Repo.all()
  end

  def list_published_posts do
    Post
    |> Post.published()
    |> Repo.all()
  end

  def create_post(post_params) do
    %Post{}
    |> Post.changeset(post_params)
    |> Repo.insert()
  end

  def find_post_by_slug(slug) do
    Post
    |> Post.with_slug(slug)
    |> Repo.one()
  end

  def find_published_post_by_slug(slug) do
    Post
    |> Post.with_slug(slug)
    |> Post.published()
    |> Repo.all()
  end
end
