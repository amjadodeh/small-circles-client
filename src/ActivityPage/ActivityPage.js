import { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
import { FriendRequestsContext } from '../Context/FriendRequestsContext';
import { API_BASE_URL } from '../config';
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

  const fetchHelper = (method, endpoint, id, reqBody) => {
    fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
      method: `${method.toUpperCase()}`,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((response) => {
        if (endpoint === 'users' && id === loggedIn.id) {
          return setUsers(
            users.map((user) =>
              user.id === loggedIn.id
                ? { ...user, friends: loggedIn.friends }
                : user
            )
          );
        } else if (endpoint === 'users') {
          return setUsers(
            users.map((user) =>
              user.id === id
                ? { ...user, friends: [...user.friends, loggedIn.id] }
                : user
            )
          );
        }

        if (endpoint === 'friendRequests' && method === 'patch') {
          return setFriendRequests(
            friendRequests.map((request) =>
              request.from === Number(id.split('-')[0]) &&
              request.to === loggedIn.id &&
              request.status === 'Pending'
                ? { ...request, status: reqBody.request_status }
                : request
            )
          );
        } else if (endpoint === 'friendRequests' && method === 'delete') {
          return setFriendRequests(
            friendRequests.filter(
              (request) =>
                request.from !== loggedIn.id ||
                request.to !== Number(id.split('-')[1]) ||
                request.status !== 'Pending'
            )
          );
        }
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  const handleClickAcceptOrDeny = (clicked, requestUserId) => {
    if (clicked === 'Accept') {
      setLoggedIn({
        ...loggedIn,
        friends: [...loggedIn.friends, requestUserId],
      });
      fetchHelper('patch', 'users', loggedIn.id, {
        friends: loggedIn.friends.toString(),
      });
      fetchHelper('patch', 'users', requestUserId, {
        friends: [
          ...users.find((user) => user.id === requestUserId).friends,
          requestUserId,
        ].toString(),
      });
      fetchHelper(
        'patch',
        'friendRequests',
        `${requestUserId}-${loggedIn.id}`,
        {
          request_status: 'Accepted',
        }
      );
    }

    if (clicked === 'Deny') {
      fetchHelper(
        'patch',
        'friendRequests',
        `${requestUserId}-${loggedIn.id}`,
        {
          request_status: 'Denied',
        }
      );
    }

    if (clicked === 'Cancel') {
      fetchHelper(
        'delete',
        'friendRequests',
        `${loggedIn.id}-${requestUserId}`
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
