import { useContext, useState } from 'react';

import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
import { FriendRequestsContext } from '../Context/FriendRequestsContext';
import { API_BASE_URL } from '../config';

const FriendRequestButton = (props) => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [users, setUsers] = useContext(UsersContext);
  const [friendRequests, setFriendRequests] = useContext(FriendRequestsContext);

  const onMountFriendRequestText = friendRequests.find(
    (request) =>
      request.from === loggedIn.id &&
      request.to === props.userId &&
      request.status === 'Pending'
  )
    ? !loggedIn.friends.includes(props.userId) && 'Cancel Friend Request'
    : friendRequests.find(
        (request) =>
          request.from === props.userId &&
          request.to === loggedIn.id &&
          request.status === 'Pending'
      )
    ? !loggedIn.friends.includes(props.userId) && 'Accept Friend Request?'
    : !loggedIn.friends.includes(props.userId) && 'Send Friend Request';

  const [friendRequestText, setFriendRequestText] = useState(
    () => onMountFriendRequestText
  );
  const [friendedText, setFriendedText] = useState(() => 'Friended');

  const requestId = props.requestId
    ? props.requestId
    : (friendRequests.find(
        (request) =>
          ((request.from === loggedIn.id && request.to === props.userId) ||
            (request.from === props.userId && request.to === loggedIn.id)) &&
          request.status === 'Pending'
      ) &&
        friendRequests.find(
          (request) =>
            ((request.from === loggedIn.id && request.to === props.userId) ||
              (request.from === props.userId && request.to === loggedIn.id)) &&
            request.status === 'Pending'
        ).id) ||
      null;

  const fetchHelper = (method, endpoint, id, reqBody, other) => {
    fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
      method: `${method.toUpperCase()}`,
      headers: {
        'content-type': 'application/json',
      },
      ...(reqBody && { body: JSON.stringify(reqBody) }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        if (endpoint === 'friendRequests' && method !== 'post') {
          return res;
        }
        return res.json();
      })
      .then((response) => {
        if (endpoint === 'users') {
          return setUsers(
            users.map((user) =>
              user.id === id
                ? { ...user, friends: [...user.friends, other] }
                : user
            )
          );
        }

        if (endpoint === 'friendRequests' && method === 'patch') {
          return setFriendRequests(
            friendRequests.map((request) =>
              request.id === id
                ? { ...request, status: reqBody.request_status }
                : request
            )
          );
        }

        if (endpoint === 'friendRequests' && method === 'delete') {
          return setFriendRequests(
            friendRequests.filter((request) => request.id !== id)
          );
        }

        if (endpoint === 'friendRequests' && method === 'post') {
          return setFriendRequests([...friendRequests, response]);
        }
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  const handleClickFriendRequestButton = (requestResponse) => {
    if (friendRequestText === 'Accept Friend Request?') {
      if (requestResponse === 'Accept') {
        setLoggedIn({
          ...loggedIn,
          friends: [...loggedIn.friends, props.userId],
        });
        fetchHelper(
          'patch',
          'users',
          loggedIn.id,
          {
            friends: [...loggedIn.friends, props.userId].toString(),
          },
          props.userId
        );
        fetchHelper(
          'patch',
          'users',
          props.userId,
          {
            friends: [
              ...users.find((user) => user.id === props.userId).friends,
              loggedIn.id,
            ].toString(),
          },
          loggedIn.id
        );
        fetchHelper(
          'patch',
          'friendRequests',
          requestId,
          {
            request_status: 'Accepted',
          },
          props.userId
        );

        return setFriendedText('Friended');
      }

      if (requestResponse === 'Deny') {
        fetchHelper(
          'patch',
          'friendRequests',
          requestId,
          {
            request_status: 'Denied',
          },
          props.userId
        );
        return setFriendRequestText('Send Friend Request');
      }
    }

    if (friendRequestText === 'Send Friend Request') {
      fetchHelper('post', 'friendRequests', '', {
        user_id_from: loggedIn.id,
        user_id_to: props.userId,
      });
      return setFriendRequestText('Cancel Friend Request');
    }

    if (friendRequestText === 'Cancel Friend Request') {
      fetchHelper('delete', 'friendRequests', requestId);
      return setFriendRequestText('Send Friend Request');
    }

    if (friendedText === 'Friended') {
      return setFriendedText('Unfriend');
    }

    if (friendedText === 'Unfriend') {
      setLoggedIn({
        ...loggedIn,
        friends: loggedIn.friends.filter(
          (friendId) => friendId !== props.userId
        ),
      });

      fetchHelper('patch', 'users', loggedIn.id, {
        friends: loggedIn.friends
          .filter((friendId) => friendId !== props.userId)
          .toString(),
      });

      fetchHelper('patch', 'users', props.userId, {
        friends: users
          .find((user) => user.id === props.userId)
          .friends.filter((friendId) => friendId !== loggedIn.id)
          .toString(),
      });

      return setFriendRequestText('Send Friend Request');
    }
  };

  if (!loggedIn.friends.includes(props.userId)) {
    return (
      <div>
        {friendRequestText === 'Accept Friend Request?' ? (
          <>
            <div>{friendRequestText}</div>
            <button onClick={() => handleClickFriendRequestButton('Deny')}>
              Deny
            </button>
            <button onClick={() => handleClickFriendRequestButton('Accept')}>
              Accept
            </button>
          </>
        ) : (
          <button onClick={handleClickFriendRequestButton}>
            {friendRequestText}
          </button>
        )}
      </div>
    );
  }

  if (loggedIn.friends.includes(props.userId)) {
    return (
      <div>
        <button onClick={handleClickFriendRequestButton}>{friendedText}</button>
      </div>
    );
  }
};

export default FriendRequestButton;
