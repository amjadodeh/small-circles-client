import { useState, useContext } from 'react';

import { PostsContext } from '../Context/PostsContext';
import TopBar from '../TopBar/TopBar';
import PostList from '../PostList/PostList';
import Nav from '../Nav/Nav';

const ExplorePage = () => {
  const [posts, setPosts] = useContext(PostsContext);

  const [search, setSearch] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchClicked(true);
  };

  return (
    <>
      <TopBar currentPage="Explore" />

      <input
        value={search}
        onChange={handleChange}
        placeholder="Search for posts"
      />
      <button onClick={handleSearch}>Search</button>

      <br />

      <PostList explore={true} search={search} />

      <Nav />
    </>
  );
};

export default ExplorePage;
