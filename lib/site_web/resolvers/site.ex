defmodule SiteWeb.Resolvers.Site do
  alias Site.Accounts

  def setup(_parent, user_params, _resolution) do
    case Accounts.any? do
      true -> {:error, "Already setup. No need."}
      false -> Accounts.create_user(user_params)
    end
  end
end
