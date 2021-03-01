import { useState, useContext } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

import { PostsContext } from '../Context/PostsContext';
import TopBar from '../TopBar/TopBar';
import PostList from '../PostList/PostList';
import UserList from '../UserList/UserList';
import Nav from '../Nav/Nav';
import './ExplorePage.css';

const ExplorePage = () => {
  const [posts, setPosts] = useContext(PostsContext);

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState(() => 'Posts');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleChangeTypeFilter = (type) => {
    setTypeFilter(type);
  };

  return (
    <>
      <TopBar currentPage="Explore" />

      <div className="explore-page-search-container">
        <div className="explore-page-search-div">
          <IoSearchOutline />
          <input
            className="explore-page-search-input"
            value={search}
            onChange={handleChange}
            placeholder={
              typeFilter === 'Posts'
                ? 'Search for posts...'
                : 'Search for users...'
            }
          />
        </div>

        <div className="explore-page-type-filter">
          <button
            style={{
              borderBottom:
                typeFilter === 'Posts'
                  ? '4px solid #f45d22'
                  : '4px solid #15202b',
            }}
            onClick={() => handleChangeTypeFilter('Posts')}
          >
            Posts
          </button>
          <button
            style={{
              borderBottom:
                typeFilter === 'Users'
                  ? '4px solid #f45d22'
                  : '4px solid #15202b',
            }}
            onClick={() => handleChangeTypeFilter('Users')}
          >
            Users
          </button>
        </div>
      </div>

      <div className="explore-page-list-div">
        <div className="explore-page-before-list-div"></div>
        {typeFilter === 'Posts' && <PostList explore={true} search={search} />}
        {typeFilter === 'Users' && <UserList explore={true} search={search} />}
      </div>

      <Nav />
    </>
  );
};

export default ExplorePage;
