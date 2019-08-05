import React, { Component, Fragment } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";
import { Route, Link } from "react-router-dom";
import { Query, Subscription } from "react-apollo";
import PublishedPosts from "gql/queries/AllPosts.graphql";
import FindPost from "gql/queries/FindPost.graphql";

class Post extends Component {
  render() {
    const { path, params } = this.props.match;
    return (
      <Query query={FindPost} variables={{ slug: params.id }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error: ${error.message}`;

          return this.renderPost(data.post);
        }}
      </Query>
    );
  }

  renderPost = post => {
    return (
      <div className="container mx-auto">
        <h1>{post.title}</h1>
      </div>
    );
  };
}

export default Post;
