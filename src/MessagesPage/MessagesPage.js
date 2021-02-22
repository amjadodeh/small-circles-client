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
    setPosts([
      ...posts,
      {
        id: posts.length + 1,
        content: message,
        private: [loggedIn.id, friendId],
        user_id: loggedIn.id,
      },
    ]);
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
