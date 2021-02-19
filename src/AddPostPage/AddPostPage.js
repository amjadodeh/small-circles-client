import { useState, useContext } from 'react';

import { PostsContext } from '../PostsContext';
import TopBar from '../TopBar/TopBar';
import Nav from '../Nav/Nav';

const AddPostPage = () => {
  const [posts, setPosts] = useContext(PostsContext);

  const [content, setContent] = useState('');

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const addPost = (e) => {
    e.preventDefault();
    setPosts([
      ...posts,
      {
        id: posts.length + 1,
        content: content,
      },
    ]);
  };

  return (
    <>
      <TopBar currentPage="Add Post" />
      <form>
        <input
          value={content}
          onChange={handleChange}
          placeholder="Post Content"
        />
        <button onClick={addPost}>Post</button>
      </form>
      <Nav />
    </>
  );
};

export default AddPostPage;
