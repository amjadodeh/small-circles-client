import { useState, useContext } from 'react';

import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
import { PostsContext } from '../Context/PostsContext';
import TopBar from '../TopBar/TopBar';
import Nav from '../Nav/Nav';

const AddPostPage = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [users, setUsers] = useContext(UsersContext);
  const [posts, setPosts] = useContext(PostsContext);

  const [content, setContent] = useState(() => '');
  const [privatePost, setPrivatePost] = useState(() => false);

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleChangePrivate = (e) => {
    setPrivatePost((privatePost) => (!privatePost ? [loggedIn.id] : false));
  };

  const handleShareWith = (e) => {
    const friendId = Number(e.target.value);

    if (typeof privatePost === 'boolean') {
      setPrivatePost([friendId]);
    } else if (privatePost) {
      if (privatePost.find((id) => id === friendId)) {
        setPrivatePost((privatePost) => [
          ...privatePost.filter((id) => id !== friendId),
        ]);
      } else {
        setPrivatePost((privatePost) => [...privatePost, friendId]);
      }
    }
  };

  const addPost = (e) => {
    e.preventDefault();
    setPosts([
      ...posts,
      {
        id: posts.length + 1,
        content: content,
        private: privatePost,
        user_id: loggedIn.id,
      },
    ]);
  };

  return (
    <>
      <TopBar currentPage="Add Post" />
      <form>
        <input
          value={content}
          onChange={handleChangeContent}
          placeholder="Post Content"
        />
        <input
          type="checkbox"
          id="private"
          name="private"
          value={privatePost}
          onChange={handleChangePrivate}
        />
        <label htmlFor="private">Private post?</label>
        <br />
        {privatePost && (
          <>
            <div>Who can see this post?</div>
            <ul>
              {loggedIn.friends.map((friendId, i) => (
                <li key={i}>
                  <input
                    type="checkbox"
                    value={friendId}
                    onChange={handleShareWith}
                  />
                  {users.find((user) => user.id === friendId).username}
                </li>
              ))}
            </ul>
          </>
        )}
        <p>
          {!privatePost
            ? 'This post can be seen by everyone.'
            : privatePost.length === 1
            ? 'Only you can see this post.'
            : 'Only you and the friends you selected can see this post.'}
        </p>
        <br />
        <br />
        <button onClick={addPost}>Post</button>
      </form>
      <Nav />
    </>
  );
};

export default AddPostPage;
