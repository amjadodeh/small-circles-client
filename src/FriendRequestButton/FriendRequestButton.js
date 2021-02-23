import { useContext, useState } from 'react';

import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
import { FriendRequestsContext } from '../Context/FriendRequestsContext';

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
    ? 'Cancel Friend Request'
    : friendRequests.find(
        (request) =>
          request.from === props.userId &&
          request.to === loggedIn.id &&
          request.status === 'Pending'
      )
    ? 'Accept Friend Request?'
    : 'Send Friend Request';

  const [friendRequestText, setFriendRequestText] = useState(
    () => onMountFriendRequestText
  );
  const [friendedText, setFriendedText] = useState(() => 'Friended');

  const handleClickFriendRequestButton = (requestResponse) => {
    if (friendRequestText === 'Accept Friend Request?') {
      if (requestResponse === 'Accept') {
        setLoggedIn({
          ...loggedIn,
          friends: [...loggedIn.friends, props.userId],
        });
        setUsers(
          users.map((user) =>
            user.id === loggedIn.id
              ? { ...user, friends: [...user.friends, props.userId] }
              : user
          )
        );
        setFriendRequests(
          friendRequests.map((request) =>
            request.from === props.userId && request.to === loggedIn.id
              ? { ...request, status: 'Accepted' }
              : request
          )
        );
        return setFriendedText('Friended');
      }

      if (requestResponse === 'Deny') {
        setFriendRequests(
          friendRequests.map((request) =>
            request.from === props.userId && request.to === loggedIn.id
              ? { ...request, status: 'Denied' }
              : request
          )
        );
        return setFriendRequestText('Send Friend Request');
      }
    }

    if (friendRequestText === 'Send Friend Request') {
      setFriendRequests([
        ...friendRequests,
        {
          from: loggedIn.id,
          to: props.userId,
          status: 'Pending',
        },
      ]);
      return setFriendRequestText('Cancel Friend Request');
    }

    if (friendRequestText === 'Cancel Friend Request') {
      setFriendRequests(
        friendRequests.filter(
          (request) =>
            request.from !== loggedIn.id ||
            request.to !== props.userId ||
            request.status !== 'Pending'
        )
      );
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

      setUsers(
        users.map((user) =>
          user.id === loggedIn.id
            ? {
                ...user,
                friends: user.friends.filter(
                  (friendId) => friendId !== props.userId
                ),
              }
            : user
        )
      );

      // return setFriendRequestText('Send Friend Request');
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
