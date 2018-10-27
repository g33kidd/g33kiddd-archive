defmodule Site.Blog.Post do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query

  # TODO: Add published field
  # TODO: Add categories
  # TODO: Add author/user
  # TODO: Add feature image
  schema "posts" do
    field :body, :string
    field :slug, :string
    field :title, :string
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:title, :body, :slug])
    |> validate_required([:title, :body, :slug])
    |> add_slug()
    |> unique_constraint(:slug)
  end

  def slugified_title(title) do
    title
    |> String.downcase()
    |> String.replace(~r/[^A-Za-z0-9\s-]/, "")
    |> String.replace(~r/(\s|-)+/, "-")
  end

  def generate_slug do
    16
    |> :crypto.strong_rand_bytes()
    |> :base64.encode()
    |> String.replace(~r/[^A-Za-z0-9]/, "")
    |> String.slice(0, 10)
    |> String.downcase()
  end

  def published(query) do
    from post in query,
      where: post.published == true
  end

  defp add_slug(changeset) do
    case get_field(changeset, :slug) do
      nil ->
        generate_slug()
        |> (&put_change(changeset, :slug, &1)).()

      _ ->
        changeset
    end
  end
end
