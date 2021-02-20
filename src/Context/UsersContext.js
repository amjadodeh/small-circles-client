import { createContext, useState } from 'react';

export const UsersContext = createContext();

export const UsersProvider = (props) => {
  const [users, setUsers] = useState(() => [
    {
      id: 1,
      username: 'User1',
      password: 'Pass1',
    },
    {
      id: 2,
      username: 'User2',
      password: 'Pass2',
    },
    {
      id: 3,
      username: 'User3',
      password: 'Pass3',
    },
  ]);
  return (
    <UsersContext.Provider value={[users, setUsers]}>
      {props.children}
    </UsersContext.Provider>
  );
};
