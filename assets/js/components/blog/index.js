import React, { Component, Fragment } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";
import { Route, Link } from "react-router-dom";
import { Query, Subscription } from "react-apollo";
import PublishedPosts from "gql/queries/AllPosts.graphql";
import FindPost from "gql/queries/FindPost.graphql";
import PostCreated from "gql/subscriptions/PostCreated.graphql";
import Post from "./post";

/**
 * TODO: Move the initialValue stuff to an Admin page or something. Start working on an editor!
 * TODO: Move main posts query to the top level and pass it down? Maybe this could work for
 */

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "A line of text in a paragraph."
              }
            ]
          }
        ]
      }
    ]
  }
});

// const Post = ({ match }) => <h1>Matched: {match.params.id}</h1>;

class Blog extends Component {
  state = {
    value: initialValue
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  render() {
    const { path, url } = this.props.match;
    return (
      <Fragment>
        <Route path={`${path}/:id`} component={Post} />
        <Route exact path={path} render={this.renderBlog} />
        <Subscription subscription={PostCreated}>
          {({ data, loading }) => {
            if (data === "undefined") return;
            if (loading) return "Watching for new posts...";
            return <h4>New post: {!loading && data.postCreated.title}</h4>;
          }}
        </Subscription>
      </Fragment>
    );
  }

  renderBlog = () => {
    return (
      <Query query={PublishedPosts}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error: ${error.message}`;

          return this.renderPosts(data.posts);
        }}
      </Query>
    );
  };

  renderPosts = posts => {
    const mappedPosts = posts.map(post => (
      <PostCard key={post.id} path={this.props.match.path} post={post} />
    ));

    return <div className="container mx-auto mt-3">{mappedPosts}</div>;
  };
}

const PostCard = ({ post, path }) => (
  <div>
    <Link to={`${path}/${post.slug}`}>{post.title}</Link>
  </div>
);

export default Blog;
