defmodule Site.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :title, :string
      add :body, :text
      add :slug, :string
      add :published, :boolean
      add :feature_image_url, :string
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create unique_index(:posts, [:slug])
    create index(:posts, [:user_id])
  end
end
