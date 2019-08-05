import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";

import createApolloClient from "config/apollo";

const apolloClient = createApolloClient();
class AdminApp extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <div>Hey</div>
      </ApolloProvider>
    );
  }
}

render(<AdminApp />, document.getElementById("app"));
