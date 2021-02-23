import { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
import { FriendRequestsContext } from '../Context/FriendRequestsContext';
import TopBar from '../TopBar/TopBar';
import Nav from '../Nav/Nav';
import './ActivityPage.css';

const ActivityPage = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [users, setUsers] = useContext(UsersContext);
  const [friendRequests, setFriendRequests] = useContext(FriendRequestsContext);

  const history = useHistory();

  const handleClickBack = () => {
    history.goBack();
  };

  const handleClickAcceptOrDeny = (clicked, requestUserId) => {
    if (clicked === 'Accept') {
      setLoggedIn({
        ...loggedIn,
        friends: [...loggedIn.friends, requestUserId],
      });
      setUsers(
        users.map((user) =>
          user.id === loggedIn.id
            ? { ...user, friends: [...user.friends, requestUserId] }
            : user
        )
      );
      setFriendRequests(
        friendRequests.map((request) =>
          request.from === requestUserId &&
          request.to === loggedIn.id &&
          request.status === 'Pending'
            ? { ...request, status: 'Accepted' }
            : request
        )
      );
    }

    if (clicked === 'Deny') {
      setFriendRequests(
        friendRequests.map((request) =>
          request.from === requestUserId && request.to === loggedIn.id
            ? { ...request, status: 'Denied' }
            : request
        )
      );
    }

    if (clicked === 'Cancel') {
      setFriendRequests(
        friendRequests.filter(
          (request) =>
            request.to !== requestUserId ||
            request.from !== loggedIn.id ||
            request.status !== 'Pending'
        )
      );
    }
  };

  return (
    <>
      <TopBar currentPage="Activity" />
      <button onClick={handleClickBack}>Back</button>
      {friendRequests.map((request, i) =>
        request.from === loggedIn.id ? (
          <div className="activity-page-activity" key={i}>
            <span>
              You sent a friend request to{' '}
              <Link to={`/account/${request.to}`}>
                {users.find((user) => user.id === request.to).username}
              </Link>
            </span>
            <div>status: {request.status}</div>
            <button
              onClick={() => handleClickAcceptOrDeny('Cancel', request.to)}
            >
              Cancel
            </button>
          </div>
        ) : (
          request.to === loggedIn.id && (
            <div className="activity-page-activity" key={i}>
              <span>
                <Link to={`/account/${request.from}`}>
                  {users.find((user) => user.id === request.from).username}
                </Link>{' '}
                sent you a friend request
              </span>
              {request.status === 'Pending' ? (
                <div>
                  <button
                    onClick={() =>
                      handleClickAcceptOrDeny('Deny', request.from)
                    }
                  >
                    Deny
                  </button>
                  <button
                    onClick={() =>
                      handleClickAcceptOrDeny('Accept', request.from)
                    }
                  >
                    Accept
                  </button>
                </div>
              ) : (
                <div>status: {request.status}</div>
              )}
            </div>
          )
        )
      )}
      <Nav />
    </>
  );
};

export default ActivityPage;
