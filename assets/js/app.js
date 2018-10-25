import "phoenix_html";
import React from "react";
import { render } from "react-dom";
import { ApolloProvider, Subscription } from "react-apollo";

const Root = () => (
  <Subscription subscription={TEST_SUBSCRIPTION}>
    {({ data, loading }) => {
      console.log(data);
      return <h1>new post: {!loading && "data loaded"}</h1>;
    }}
  </Subscription>
);

const Application = () => {
  return (
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>
  );
};

render(<Application />, document.getElementById("app"));
