import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";

export default (createApolloClient = () => {
  const app_url =
    process.env.NODE_ENV !== "production" ? "localhost:4000" : "g33kidd.com";

  // Creates the HTTP Link to send GraphQL queries to.
  const httpLink = new HttpLink({
    uri: `http://${app_url}/api`
  });

  // Creates the Absinthe Socket Link to communicate with the Absinthe Subscription service.
  const wsLink = createAbsintheSocketLink(
    AbsintheSocket.create(new PhoenixSocket(`ws://${app_url}/socket`))
  );

  // Link multiple ApolloLink's together.
  // Splits the type of operation of subscription to the wsLink and others to httpLink.
  // Just because they handle them differently and also each need to know where to connect.
  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    link,
    cache: new InMemoryCache()
  });
});
