import { createContext, useState } from 'react';

export const UsersContext = createContext();

export const UsersProvider = (props) => {
  const [users, setUsers] = useState(() => [
    {
      id: 1,
      username: 'User 1',
      password: 'password1',
    },
    {
      id: 2,
      username: 'User 2',
      password: 'password2',
    },
    {
      id: 3,
      username: 'User 3',
      password: 'password3',
    },
  ]);
  return (
    <UsersContext.Provider value={[users, setUsers]}>
      {props.children}
    </UsersContext.Provider>
  );
};
