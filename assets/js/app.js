import "phoenix_html";
import React, { Fragment } from "react";
import { render } from "react-dom";
import { ApolloProvider, Subscription } from "react-apollo";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import createApolloClient from "./config/apollo";
import Header from "./components/header";
import GlobalStyle from "./config/style";

// const Root = () => (
//   <Subscription subscription={TEST_SUBSCRIPTION}>
//     {({ data, loading }) => {
//       console.log(data);
//       return <h1>new post: {!loading && "data loaded"}</h1>;
//     }}
//   </Subscription>
// );

// TODO: Extract the router stuff into its own component!

import Home from "./components/home";
import navigation, { map } from "./config/navigation";

const Footer = () => <div>Hello foot!</div>;
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

const client = createApolloClient();
const Application = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Fragment>
          <Header />
          <Routes />
          <Footer />
          <GlobalStyle />
        </Fragment>
      </Router>
    </ApolloProvider>
  );
};

render(<Application />, document.getElementById("app"));
