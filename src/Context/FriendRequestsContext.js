import { createContext, useState } from 'react';

export const FriendRequestsContext = createContext();

export const FriendRequestsProvider = (props) => {
  const [friendRequests, setFriendRequests] = useState(() => [
    {
      from: 2,
      to: 4,
      status: 'Pending',
    },
    {
      from: 4,
      to: 1,
      status: 'Pending',
    },
  ]);
  return (
    <FriendRequestsContext.Provider value={[friendRequests, setFriendRequests]}>
      {props.children}
    </FriendRequestsContext.Provider>
  );
};
