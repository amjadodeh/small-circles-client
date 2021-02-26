import { createContext, useState, useEffect } from 'react';

import { API_BASE_URL } from '../config';

export const PostsContext = createContext();

export const PostsProvider = (props) => {
  const [posts, setPosts] = useState(() => []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/posts`, {
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
        return setPosts(
          response.map((post) => ({
            id: post.id,
            content: post.content,
            private: post.private
              ? post.private.split(',').map((NaN) => Number(NaN))
              : false,
            user_id: post.user_id,
          }))
        );
      })
      .catch((error) => {
        console.error({ error });
      });
  }, []);

  return (
    <PostsContext.Provider value={[posts, setPosts]}>
      {props.children}
    </PostsContext.Provider>
  );
};
