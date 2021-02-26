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
    const newPost = {
      content: content,
      private: privatePost === [] ? null : privatePost.toString(),
      user_id: loggedIn.id,
    };

    fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((response) => {
        return setPosts([
          ...posts,
          {
            ...response,
          },
        ]);
      })
      .catch((error) => {
        console.error({ error });
      });
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
