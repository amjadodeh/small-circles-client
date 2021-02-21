import { useContext } from 'react';

import { PostsContext } from '../Context/PostsContext';
import { LoggedInContext } from '../Context/LoggedInContext';
import Post from '../Post/Post';
import './PostList.css';

const PostList = (props) => {
  const [posts, setPosts] = useContext(PostsContext);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

  if (props.search) {
    return posts.find((post) =>
      post.content.toLowerCase().includes(props.search.toLowerCase())
    )
      ? posts.map((post) =>
          post.content.toLowerCase().includes(props.search.toLowerCase()) &&
          !post.private ? (
            <Post key={post.id} content={post.content} />
          ) : (
            post.private.includes(loggedIn.id) && (
              <Post key={post.id} content={post.content} />
            )
          )
        )
      : 'nothing here';
    // } else if (props.user) { // future implementation
    //   return <div></div>;
  } else if (props.onlyForYou) {
    return posts.map(
      (post) =>
        post.private &&
        post.private.includes(loggedIn.id) &&
        post.private.length === 1 && (
          <Post
            key={post.id}
            onlyForYou={true}
            postUserId={post.user_id}
            content={post.content}
          />
        )
    );
  } else {
    return posts.map((post) =>
      !post.private ? (
        <Post key={post.id} content={post.content} />
      ) : (
        post.private.includes(loggedIn.id) &&
        post.private.length > 1 && (
          <Post key={post.id} private={true} content={post.content} />
        )
      )
    );
  }
};

export default PostList;
