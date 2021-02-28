import { createContext, useState, useEffect } from 'react';

import { API_BASE_URL } from '../config';

export const UsersContext = createContext();

export const UsersProvider = (props) => {
  const [users, setUsers] = useState(() => []);

  useEffect(() => {
    const updateContext = () => {
      fetch(`${API_BASE_URL}/users`, {
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
          return setUsers(
            response.map((user) => ({
              id: user.id,
              username: user.username,
              profile_picture: user.profile_picture,
              friends: user.friends
                ? user.friends.split(',').map((NaN) => Number(NaN))
                : [],
            }))
          );
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
    <UsersContext.Provider value={[users, setUsers]}>
      {props.children}
    </UsersContext.Provider>
  );
};
