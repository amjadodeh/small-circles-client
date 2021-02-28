import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
import { PostsContext } from '../Context/PostsContext';
import { API_BASE_URL } from '../config';
import TopBar from '../TopBar/TopBar';
import Nav from '../Nav/Nav';
import './AddPostPage.css';

const AddPostPage = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [users, setUsers] = useContext(UsersContext);
  const [posts, setPosts] = useContext(PostsContext);

  const [content, setContent] = useState(() => '');
  const [privatePost, setPrivatePost] = useState(() => false);
  const [validationError, setValidationError] = useState(() => '');

  const history = useHistory();

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
    if (content) {
      setValidationError('');
      const newPost = {
        content: content,
        ...(privatePost &&
          privatePost !== [] && { private: privatePost.toString() }),
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
          setPosts([
            ...posts,
            {
              ...response,
              private: response.private
                ? response.private.split(',').map((NaN) => Number(NaN))
                : false,
            },
          ]);
          return history.push(`/account/${loggedIn.id}`);
        })
        .catch((error) => {
          console.error({ error });
        });
    } else {
      setValidationError('Please enter post content');
    }
  };

  return (
    <>
      <TopBar currentPage="Add Post" />
      <form className="add-post-page-form">
        <div className="add-post-page-top-section">
          <textarea
            className="add-post-page-input"
            value={content}
            onChange={handleChangeContent}
            placeholder="Post Content"
            maxLength="255"
          />
          <div className="add-post-page-error">{validationError}</div>
          <div className="add-post-page-private-post-checkbox">
            <input
              type="checkbox"
              id="private"
              name="private"
              value={privatePost}
              onChange={handleChangePrivate}
            />
            <label htmlFor="private">Private Post</label>
          </div>
          {privatePost && (
            <div className="add-post-page-div-top-friendlist">
              Share With Friends
            </div>
          )}
        </div>
        <br />
        {privatePost && (
          <>
            <ul className="add-post-page-ul">
              {loggedIn.friends.map((friendId, i) => (
                <li key={i} className="add-post-page-li">
                  <input
                    type="checkbox"
                    value={friendId}
                    onChange={handleShareWith}
                  />
                  <img
                    className="add-post-page-img"
                    src={
                      users.find((user) => user.id === friendId).profile_picture
                    }
                  />
                  {users.find((user) => user.id === friendId).username}
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="add-post-page-bottom-section">
          <p className="add-post-page-p">
            {!privatePost
              ? 'This post can be seen by everyone.'
              : privatePost.length === 1
              ? 'Only you can see this post.'
              : privatePost.length === 2
              ? 'This post will be sent as a direct message.'
              : 'Only you and selected friends can see this post.'}
          </p>
          <button
            className="add-post-page-post-btn"
            style={{ backgroundColor: content ? '#f45d22' : '#843e26' }}
            onClick={addPost}
          >
            Post
          </button>
        </div>
      </form>
      <Nav noAddPostBtn={true} />
    </>
  );
};

export default AddPostPage;
