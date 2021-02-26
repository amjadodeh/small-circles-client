import { useContext, useState } from 'react';

import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
import { PostsContext } from '../Context/PostsContext';
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

  const handleShowMessages = (friendId) => {
    setShowMessages((showMessages) => (showMessages ? false : friendId));
  };

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleClickSend = (friendId) => {
    const newPost = {
      content: message,
      private: [loggedIn.id, friendId],
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
      {showMessages === false && (
        <>
          <TopBar currentPage="Messages" />{' '}
          <p>One to one posts are shown here.</p> <Nav />
        </>
      )}

      {loggedIn.friends.map((friendId, i) => (
        <div key={i}>
          {showMessages === false && (
            <button onClick={() => handleShowMessages(friendId)}>
              {users.find((user) => user.id === friendId).username}
            </button>
          )}

          {showMessages === friendId && (
            <>
              <TopBar
                currentPage={
                  users.find((user) => user.id === friendId).username
                }
              />
              <button onClick={handleShowMessages}>back</button>
              <br />
              <div className="messages-page-postlist-div">
                <PostList
                  messages={users.find((user) => user.id === friendId)}
                />
              </div>
              <div className="messages-page-message-div">
                <input
                  placeholder="Message..."
                  value={message}
                  onChange={handleChangeMessage}
                />
                <button onClick={() => handleClickSend(friendId)}>send</button>
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
