import { createContext, useState } from 'react';

export const PostsContext = createContext();

export const PostsProvider = (props) => {
  const [posts, setPosts] = useState(() => [
    {
      id: 1,
      content: 'Hello, App! This is Post 1!',
      private: false,
      user_id: 1,
    },
    {
      id: 2,
      content: 'Hello from Post 2!',
      private: false,
      user_id: 1,
    },
    {
      id: 3,
      content: 'Hello from Post 3!',
      private: false,
      user_id: 1,
    },
    {
      id: 4,
      content: 'Hello from Post 4... A post for only User1',
      private: [1],
      user_id: 1,
    },
    {
      id: 5,
      content: 'Hello from Post 5... A post for User1 and User2',
      private: [1],
      user_id: 2,
    },
    {
      id: 6,
      content:
        'Hello from Post 6... A hidden post for User1, User2, and User3... Me!',
      private: [3, 2, 1],
      user_id: 3,
    },
    {
      id: 7,
      content: 'Hello from Post 6... A hidden post for only User2... Me!',
      private: [2],
      user_id: 2,
    },
  ]);
  return (
    <PostsContext.Provider value={[posts, setPosts]}>
      {props.children}
    </PostsContext.Provider>
  );
};
