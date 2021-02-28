import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack, BiSend } from 'react-icons/bi';

import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
import { PostsContext } from '../Context/PostsContext';
import { API_BASE_URL } from '../config';
import TopBar from '../TopBar/TopBar';
import PostList from '../PostList/PostList';
import Nav from '../Nav/Nav';
import './MessagesPage.css';

const MessagesPage = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [users, setUsers] = useContext(UsersContext);
  const [posts, setPosts] = useContext(PostsContext);

  const [showMessages, setShowMessages] = useState(() => false);
  const [message, setMessage] = useState(() => '');

  const updatePostsContext = () => {
    fetch(`${API_BASE_URL}/posts`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((response) => {
        return setPosts(
          response.map((post) => ({
            id: post.id,
            content: post.content,
            private: post.private
              ? post.private.split(',').map((NaN) => Number(NaN))
              : false,
            user_id: post.user_id,
          }))
        );
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  useEffect(() => {
    const fetchInterval = setInterval(updatePostsContext, 1000);

    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  const handleShowMessages = (friendId) => {
    setShowMessages((showMessages) => (showMessages ? false : friendId));
  };

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleClickSend = (friendId) => {
    const newPost = {
      content: message,
      private: [loggedIn.id, friendId].toString(),
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
            private: response.private.split(',').map((NaN) => Number(NaN)),
          },
        ]);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  return (
    <>
      {showMessages === false && (
        <>
          <TopBar currentPage="Messages" />
          <p className="messages-page-p">
            One to one posts are shown here as messages.
          </p>
          <Nav />
        </>
      )}

      {loggedIn.friends.map((friendId, i) => (
        <div key={i}>
          {showMessages === false && (
            <button
              className="messages-page-friendlist-div"
              onClick={() => handleShowMessages(friendId)}
            >
              <img
                src={users.find((user) => user.id === friendId).profile_picture}
              />
              {users.find((user) => user.id === friendId).username}
            </button>
          )}

          {showMessages === friendId && (
            <>
              <TopBar
                currentPage={
                  <Link
                    to={`/account/${friendId}`}
                    className="messages-page-user-link-btn"
                  >
                    {users.find((user) => user.id === friendId).username}
                  </Link>
                }
              />
              <button
                className="messages-page-back-btn"
                onClick={handleShowMessages}
              >
                <BiArrowBack size="2.5em" color="#f45d22" title="Back" />
              </button>
              <br />
              <div className="messages-page-postlist-div">
                <PostList
                  messages={users.find((user) => user.id === friendId)}
                />
              </div>
              <div className="messages-page-message-div">
                <input
                  className="messages-page-input"
                  placeholder="Message..."
                  value={message}
                  onChange={handleChangeMessage}
                />
                <button
                  className="messages-page-send-btn"
                  onClick={() => handleClickSend(friendId)}
                >
                  <BiSend
                    size="3em"
                    color={message ? '#f45d22' : '#843e26'}
                    title="Send"
                  />
                </button>
              </div>
            </>
          )}

          <br />
        </div>
      ))}
    </>
  );
};

export default MessagesPage;
