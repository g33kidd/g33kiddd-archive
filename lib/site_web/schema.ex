defmodule SiteWeb.Schema do
  use Absinthe.Schema

  alias SiteWeb.Resolvers

  # Post
  # Category
  # User/Author
  # Tags
  # Discord Stuff
  # Code editing stuff like WakaTime

  @desc "The user object!"
  object :user do
    field :id, :id
    field :username, :string
    field :email, :string
  end

  @desc "This is a Post!"
  object :post do
    field :id, :id
    field :title, :string
    field :body, :string
    field :slug, :string
    field :category, :category
    field :feature_image_url, :string
  end

  @desc "This is a category!"
  object :category do
    field :id, :id
    field :name, :string
  end

  query do
    @desc "Gets a list of all posts on the site."
    field :posts, list_of(:post) do
      resolve &Resolvers.Blog.list_posts/3
    end

    @desc "Gets a list of all published posts on the site."
    field :published_posts, list_of(:post) do
      resolve &Resolvers.Blog.list_published_posts/3
    end

    @desc "Find a post by the slug."
    field :post, :post do
      arg :slug, non_null(:string)
      resolve &Resolvers.Blog.find_post/3
    end
  end

  mutation do
    @desc "Setup the site, create an admin user."
    field :setup, :user do
      arg :sitename, non_null(:string)
      arg :description, non_null(:string)
      # add some other fields here for "customization" features.

      arg :username, non_null(:string)
      arg :email, non_null(:string)
      arg :password, non_null(:string)

      resolve &Resolvers.Site.setup/3
    end

    @desc "Creates a new post."
    field :create_post, :post do
      arg :title, non_null(:string)
      arg :body, non_null(:string)
      arg :slug, non_null(:string)
      arg :published, :boolean

      resolve &Resolvers.Blog.create_post/3
    end
  end

  subscription do
    @desc "Subscription for listening when a new post is created."
    field :post_created, :post do
      config fn _args, _ ->
        {:ok, topic: "posts"}
      end

      trigger :create_post, topic: fn _post ->
        "posts"
      end
      resolve &Resolvers.Blog.on_post_created/3
    end
  end
end
