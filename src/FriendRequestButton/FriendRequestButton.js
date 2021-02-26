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

  const fetchHelper = (method, endpoint, id, reqBody) => {
    fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
      method: `${method.toUpperCase()}`,
      headers: {
        'content-type': 'application/json',
      },
      ...(reqBody && { body: JSON.stringify(reqBody) }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((response) => {
        if (endpoint === 'users' && id === loggedIn.id && method === 'patch') {
          return setUsers(
            users.map((user) =>
              user.id === loggedIn.id
                ? { ...user, friends: loggedIn.friends }
                : user
            )
          );
        } else if (endpoint === 'users' && method === 'patch') {
          return setUsers(
            users.map((user) =>
              user.id === id ? { ...user, friends: reqBody.friends } : user
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
        } else if (endpoint === 'friendRequests' && method === 'post') {
          setFriendRequests([
            ...friendRequests,
            {
              from: loggedIn.id,
              to: props.userId,
              status: 'Pending',
            },
          ]);
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

        fetchHelper('patch', 'users', loggedIn.id, {
          friends: loggedIn.friends.toString(),
        });
        fetchHelper('patch', 'users', props.userId, {
          friends: [
            ...users.find((user) => user.id === props.userId).friends,
            props.userId,
          ].toString(),
        });
        fetchHelper(
          'patch',
          'friendRequests',
          `${props.userId}-${loggedIn.id}`,
          {
            request_status: 'Accepted',
          }
        );

        return setFriendedText('Friended');
      }

      if (requestResponse === 'Deny') {
        fetchHelper(
          'patch',
          'friendRequests',
          `${props.userId}-${loggedIn.id}`,
          {
            request_status: 'Denied',
          }
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
      fetchHelper('delete', 'friendRequests', `${loggedIn.id}-${props.userId}`);
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
        friends: loggedIn.friends.toString(),
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
