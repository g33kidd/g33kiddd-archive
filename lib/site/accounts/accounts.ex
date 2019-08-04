defmodule Site.Accounts do
  alias Site.Repo
  alias Site.Accounts.User


  def create_user(user_params) do
    %User{}
    |> User.changeset(user_params)
    |> Repo.insert()
  end

  def list_users do
    User
    |> Repo.all()
  end

  def any? do
    User
    |> Repo.all()
    |> Enum.any?()
  end
end
