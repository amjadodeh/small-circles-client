import { useContext } from 'react';

import { PostsContext } from '../Context/PostsContext';
import { LoggedInContext } from '../Context/LoggedInContext';
import Post from '../Post/Post';
import './PostList.css';

const PostList = (props) => {
  const [posts, setPosts] = useContext(PostsContext);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

  // Posts for logged in users page
  if (props.user) {
    // future implementation
    return <div></div>;
  }

  // Private posts for logged in user / shared with nobody
  if (props.private) {
    return posts.map(
      (post) =>
        post.private &&
        post.user_id === loggedIn.id &&
        post.private.length === 1 && (
          <Post
            key={post.id}
            private={true}
            postUserId={post.user_id}
            content={post.content}
          />
        )
    );
  }

  // Posts shared with only you and posts you shared with only one friend
  if (props.messages) {
    return posts.map(
      (post) =>
        post.private &&
        post.private.find((id) => id === loggedIn.id) &&
        post.private.find((id) => id === props.messages.id) &&
        post.private.length === 2 && (
          <div key={post.id}>
            <Post
              messages={true}
              friend={post.private[1] ? post.private[1] : false}
              postUserId={post.user_id}
              content={post.content}
            />
          </div>
        )
    );
  }

  // Search through public posts and posts shared with circle
  if (props.explore) {
    return (
      posts.map((post) =>
        post.content.toLowerCase().includes(props.search.toLowerCase()) &&
        !post.private ? (
          <Post
            key={post.id}
            public={true}
            postUserId={post.user_id}
            content={post.content}
          />
        ) : (
          post.private &&
          post.private.find((id) => id === loggedIn.id) &&
          post.private.length > 2 && (
            <Post
              key={post.id}
              sharedWithCircle={true}
              postUserId={post.user_id}
              content={post.content}
            />
          )
        )
      ) || 'nothing here'
    );
  }

  // Posts shared with circle
  if (props.home) {
    return posts.map(
      (post) =>
        post.private &&
        post.private.find((id) => id === loggedIn.id) &&
        post.private.length > 2 && (
          <Post
            key={post.id}
            sharedWithCircle={true}
            postUserId={post.user_id}
            content={post.content}
          />
        )
    );
  }
};

export default PostList;
