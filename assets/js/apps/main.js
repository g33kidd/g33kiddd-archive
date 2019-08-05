import "phoenix_html";
import React, { Fragment, Component } from "react";
import { render } from "react-dom";
import { ApolloProvider, Subscription } from "react-apollo";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import createApolloClient from "config/apollo";
import Header from "components/header";
import GlobalStyle from "config/style";
import navigation, { map } from "config/navigation";

const apolloClient = createApolloClient();
const Routes = () => (
  <Fragment>
    {map(navigation, (path, item, i) => (
      <Route
        path={path}
        exact={item.exact}
        component={item.component}
        key={i}
      />
    ))}
  </Fragment>
);

class MainApp extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Router>
          <Fragment>
            <Header />
            <Routes />
            <GlobalStyle />
          </Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

render(<MainApp />, document.getElementById("app"));
