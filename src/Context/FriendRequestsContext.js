import { createContext, useState, useEffect } from 'react';

import { API_BASE_URL } from '../config';

export const FriendRequestsContext = createContext();

export const FriendRequestsProvider = (props) => {
  const [friendRequests, setFriendRequests] = useState(() => []);

  useEffect(() => {
    const updateContext = () => {
      fetch(`${API_BASE_URL}/friendRequests`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) return res.json().then((e) => Promise.reject(e));
          return res.json();
        })
        .then((response) => {
          return setFriendRequests(response);
        })
        .catch((error) => {
          console.error({ error });
        });
    };

    updateContext();

    const fetchInterval = setInterval(updateContext, 10000);

    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  return (
    <FriendRequestsContext.Provider value={[friendRequests, setFriendRequests]}>
      {props.children}
    </FriendRequestsContext.Provider>
  );
};
