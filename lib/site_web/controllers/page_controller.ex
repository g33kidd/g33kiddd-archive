defmodule SiteWeb.PageController do
  use SiteWeb, :controller
  alias Site.Accounts

  plug :put_layout, false

  def index(conn, _params) do
    render conn, "index.html"
  end

  def admin(conn, _params) do
    case Accounts.any? do
      true -> render(conn, "admin.html")
      false -> render(conn, "setup.html")
    end
  end
end
