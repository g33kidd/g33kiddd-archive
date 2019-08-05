import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";

import createApolloClient from "config/apollo";

const apolloClient = createApolloClient();
class SetupApp extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <div>Hey</div>
      </ApolloProvider>
    );
  }
}

render(<SetupApp />, document.getElementById("app"));
