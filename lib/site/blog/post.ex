defmodule Site.Blog.Post do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query

  # TODO: Add published field
  # TODO: Add categories
  # TODO: Add author/user
  # TODO: Add feature image
  schema "posts" do
    field(:body, :string)
    field(:slug, :string)
    field(:title, :string)
    field(:user_id, :id)

    timestamps()
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:title, :body, :slug])
    |> validate_required([:title, :body, :slug])
    |> unique_constraint(:slug)
  end

  def published(query) do
    from post in query,
      where: post.published == true
  end
end
