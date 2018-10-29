defmodule Site.BlogTest do
  use Site.DataCase
  alias Site.Blog
  alias Site.Accounts.User

  setup _context do
    create_user()
  end

  describe "blog tests" do
    test "list posts test", context do
      Blog.create_post(%{body: "Sample Body", slug: "Test", title: "test", user_id: context.user.id})
      refute Enum.empty?(Blog.list_posts)
    end
  end

  def create_post do

  end

  def create_user do
    {:ok, user} = Site.Repo.insert(%User{email: "test@email", username: "user"})
    %{user: user}
  end
end
