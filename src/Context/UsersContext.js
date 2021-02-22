import { createContext, useState } from 'react';

export const UsersContext = createContext();

export const UsersProvider = (props) => {
  const [users, setUsers] = useState(() => [
    {
      id: 1,
      username: 'User1',
      password: 'Pass1',
      profile_picture:
        'https://images.pexels.com/photos/772478/pexels-photo-772478.jpeg',
      friends: [2, 3],
    },
    {
      id: 2,
      username: 'User2',
      password: 'Pass2',
      profile_picture:
        'https://images.pexels.com/photos/772478/pexels-photo-772478.jpeg',
      friends: [1, 3],
    },
    {
      id: 3,
      username: 'User3',
      password: 'Pass3',
      profile_picture:
        'https://images.pexels.com/photos/772478/pexels-photo-772478.jpeg',
      friends: [1, 2],
    },
    {
      id: 4,
      username: 'User4',
      password: 'Pass4',
      profile_picture:
        'https://images.pexels.com/photos/772478/pexels-photo-772478.jpeg',
      friends: [],
    },
  ]);
  return (
    <UsersContext.Provider value={[users, setUsers]}>
      {props.children}
    </UsersContext.Provider>
  );
};
