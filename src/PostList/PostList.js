import { useContext } from 'react';

import { PostsContext } from '../Context/PostsContext';
import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
import Post from '../Post/Post';
import './PostList.css';
import { Link } from 'react-router-dom';

const PostList = (props) => {
  const [posts, setPosts] = useContext(PostsContext);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [users, setUsers] = useContext(UsersContext);

  // Private posts for logged in user / shared with nobody
  if (props.private) {
    return posts.map(
      (post) =>
        post.private &&
        post.user_id === loggedIn.id &&
        post.private.length === 1 && (
          <Post
            key={post.id}
            sharedWithFriends={true}
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

  // Posts for account page / Posts shared with friends and circles you are in
  if (props.userId) {
    if (
      posts.find((post) =>
        !post.private &&
        (users
          .find((user) => user.id === post.user_id)
          .friends.includes(loggedIn.id) ||
          post.user_id === loggedIn.id) &&
        post.user_id === props.userId ? (
          <Post
            key={post.id}
            sharedWithFriends={true}
            postUserId={post.user_id}
            content={post.content}
          />
        ) : (
          post.private &&
          post.user_id === props.userId &&
          post.private.includes(loggedIn.id) &&
          post.private.length > 2 && (
            <Post
              key={post.id}
              sharedWithCircle={true}
              postUserId={post.user_id}
              content={post.content}
            />
          )
        )
      )
    ) {
      if (
        users
          .find((user) => user.id === props.userId)
          .friends.includes(loggedIn.id)
      ) {
        return posts.map((post) =>
          !post.private && post.user_id === props.userId ? (
            <Post
              key={post.id}
              sharedWithFriends={true}
              postUserId={post.user_id}
              content={post.content}
            />
          ) : (
            post.private &&
            post.user_id === props.userId &&
            post.private.includes(loggedIn.id) &&
            post.private.length > 2 && (
              <Post
                key={post.id}
                sharedWithCircle={true}
                postUserId={post.user_id}
                content={post.content}
              />
            )
          )
        );
      }

      if (props.userId === loggedIn.id) {
        return posts.map((post) =>
          !post.private && post.user_id === props.userId ? (
            <Post
              key={post.id}
              sharedWithFriends={true}
              postUserId={post.user_id}
              content={post.content}
            />
          ) : (
            post.private &&
            post.user_id === props.userId &&
            post.private.includes(loggedIn.id) &&
            post.private.length > 2 && (
              <Post
                key={post.id}
                sharedWithCircle={true}
                postUserId={post.user_id}
                content={post.content}
              />
            )
          )
        );
      }
    }

    if (
      users
        .find((user) => user.id === props.userId)
        .friends.includes(loggedIn.id)
    ) {
      return (
        <div className="postlist-message">
          <div>User has not shared any posts.</div>
        </div>
      );
    }

    if (props.userId === loggedIn.id) {
      return (
        <div className="postlist-message">
          <div>You have not shared any posts.</div>
          <Link to="/add-post" className="postlist-btn">
            Share First Post!
          </Link>
        </div>
      );
    }

    // If user is not your friend
    return (
      <div className="postlist-message">
        <h2>Private</h2>
        <div>You are not friends with this user.</div>
      </div>
    );
  }

  // Search through posts shared with friends and circles you are part up
  if (props.explore) {
    return posts.find((post) =>
      post.content.toLowerCase().includes(props.search.toLowerCase()) &&
      !post.private &&
      (users
        .find((user) => user.id === post.user_id)
        .friends.includes(loggedIn.id) ||
        post.user_id === loggedIn.id) ? (
        <Post
          key={post.id}
          sharedWithFriends={true}
          postUserId={post.user_id}
          content={post.content}
        />
      ) : (
        post.content.toLowerCase().includes(props.search.toLowerCase()) &&
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
    ) ? (
      posts.map((post) =>
        post.content.toLowerCase().includes(props.search.toLowerCase()) &&
        !post.private &&
        (users
          .find((user) => user.id === post.user_id)
          .friends.includes(loggedIn.id) ||
          post.user_id === loggedIn.id) ? (
          <Post
            key={post.id}
            sharedWithFriends={true}
            postUserId={post.user_id}
            content={post.content}
          />
        ) : (
          post.content.toLowerCase().includes(props.search.toLowerCase()) &&
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
      )
    ) : (
      <div className="postlist-message">
        <h2>No Results...</h2>
      </div>
    );
  }

  // posts shared with friends and circles you are part up
  if (props.home) {
    return posts.find((post) =>
      !post.private &&
      (users
        .find((user) => user.id === post.user_id)
        .friends.includes(loggedIn.id) ||
        post.user_id === loggedIn.id) ? (
        <Post
          key={post.id}
          sharedWithFriends={true}
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
    ) ? (
      posts.map((post) =>
        !post.private &&
        (users
          .find((user) => user.id === post.user_id)
          .friends.includes(loggedIn.id) ||
          post.user_id === loggedIn.id) ? (
          <Post
            key={post.id}
            sharedWithFriends={true}
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
      )
    ) : (
      <div className="postlist-message">
        <h2>Welcome to Small Circles!</h2>
        <div>Find friends to see their posts here.</div>
        <Link to="/explore" className="postlist-btn">
          Let's Go!
        </Link>
      </div>
    );
  }
};

export default PostList;
