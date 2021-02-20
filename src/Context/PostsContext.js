import { createContext, useState } from 'react';

export const PostsContext = createContext();

export const PostsProvider = (props) => {
  const [posts, setPosts] = useState(() => [
    {
      id: 1,
      content: 'Hello, App! This is Post 1!',
      user_id: '1',
    },
    {
      id: 2,
      content: 'Hello from Post 2!',
      user_id: '1',
    },
    {
      id: 3,
      content: 'Hello from Post 3!',
      user_id: '1',
    },
  ]);
  return (
    <PostsContext.Provider value={[posts, setPosts]}>
      {props.children}
    </PostsContext.Provider>
  );
};
