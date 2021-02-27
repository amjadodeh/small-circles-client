import { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
import { FriendRequestsContext } from '../Context/FriendRequestsContext';
import { API_BASE_URL } from '../config';
import TopBar from '../TopBar/TopBar';
import FriendRequestButton from '../FriendRequestButton/FriendRequestButton';
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

  const fetchHelper = (requestId) => {
    fetch(`${API_BASE_URL}/friendRequests/${requestId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res;
      })
      .then((response) => {
        return setFriendRequests(
          friendRequests.filter((request) => request.id !== requestId)
        );
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  const handleClickCancel = (requestId) => {
    fetchHelper(requestId);
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
            {request.status === 'Pending' ? (
              <>
                <div>status: {request.status}</div>
                <button onClick={() => handleClickCancel(request.id)}>
                  Cancel
                </button>
              </>
            ) : (
              <div>status: {request.status}</div>
            )}
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
                <FriendRequestButton
                  userId={request.from}
                  requestId={request.id}
                />
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
