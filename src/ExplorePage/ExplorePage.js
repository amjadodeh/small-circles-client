import { useState, useContext } from 'react';

import { PostsContext } from '../Context/PostsContext';
import TopBar from '../TopBar/TopBar';
import PostList from '../PostList/PostList';
import UserList from '../UserList/UserList';
import Nav from '../Nav/Nav';
import './ExplorePage.css';

const ExplorePage = () => {
  const [posts, setPosts] = useContext(PostsContext);

  const [search, setSearch] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const [typeFilter, setTypeFilter] = useState(() => 'Posts');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchClicked(true);
  };

  const handleChangeTypeFilter = (type) => {
    setTypeFilter(type);
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
      <br />

      <div className="explore-page-type-filter">
        <button onClick={() => handleChangeTypeFilter('Posts')}>Posts</button>
        <button onClick={() => handleChangeTypeFilter('Users')}>Users</button>
      </div>

      <br />

      {typeFilter === 'Posts' && <PostList explore={true} search={search} />}
      {typeFilter === 'Users' && <UserList explore={true} search={search} />}

      <Nav />
    </>
  );
};

export default ExplorePage;
