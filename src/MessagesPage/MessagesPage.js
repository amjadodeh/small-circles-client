import { useContext, useState } from 'react';

import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
import TopBar from '../TopBar/TopBar';
import PostList from '../PostList/PostList';
import Nav from '../Nav/Nav';

const MessagesPage = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [users, setUsers] = useContext(UsersContext);

  const [showMessages, setShowMessages] = useState(() => false);

  const handleShowMessages = (friendId) => {
    setShowMessages((showMessages) => (showMessages ? false : friendId));
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
          {showMessages === friendId && (
            <TopBar
              currentPage={users.find((user) => user.id === friendId).username}
            />
          )}

          {showMessages === false && (
            <button onClick={() => handleShowMessages(friendId)}>
              {users.find((user) => user.id === friendId).username}
            </button>
          )}

          {showMessages === friendId && (
            <>
              <button onClick={handleShowMessages}>back</button>
              <br />
              <PostList messages={users.find((user) => user.id === friendId)} />
              <div className="messages-page-message-div">
                <input placeholder="Message..." />
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
