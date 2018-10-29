import React, { Component, Fragment } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";
import { Route, Link } from "react-router-dom";
import { Query, Subscription } from "react-apollo";
import PublishedPosts from "gql/queries/AllPosts.graphql";
import FindPost from "gql/queries/FindPost.graphql";
import PostCreated from "gql/subscriptions/PostCreated.graphql";

/**
 * TODO: Move the initialValue stuff to an Admin page or something. Start working on an editor!
 *
 * TODO: Move main posts query to the top level and pass it down? Maybe this could work for
 * TODO caching of posts and instead of going out to make another request when clicking on a post it'll load from cache.
 *
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
    return <h1>{post.title}</h1>;
  };
}

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
        <Link to={`${url}/this-is-a-post`}>Post Link</Link>
        <Route path={`${path}/:id`} component={Post} />
        <Route exact path={path} render={this.renderBlog} />
        <Subscription subscription={PostCreated}>
          {({ data, loading }) => {
            if (data === "undefined") return;
            if (loading) return "Loading...";

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
    return posts.map(post => (
      <div key={post.id}>
        <Link to={`${this.props.match.path}/${post.slug}`}>{post.title}</Link>
      </div>
    ));
  };
}

export default Blog;
