import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
import TopBar from '../TopBar/TopBar';
import PostList from '../PostList/PostList';
import Nav from '../Nav/Nav';
import './AccountPage.css';

const AccountPage = (props) => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [users, setUsers] = useContext(UsersContext);

  const [showPrivatePosts, setShowPrivatePosts] = useState(() => false);

  const location = useLocation();

  const handleShowPrivatePosts = () => {
    setShowPrivatePosts((showPrivatePosts) => !showPrivatePosts);
  };

  const userId = Number(location.pathname.replace('/account/', ''));
  const user = users.find((user) => user.id === userId);

  if (loggedIn.id === userId) {
    return (
      <>
        <TopBar currentPage={loggedIn.username} />

        {!showPrivatePosts ? (
          <>
            <button
              className="account-page-private-posts-button"
              onClick={handleShowPrivatePosts}
            >
              Private Posts
            </button>

            <img
              className="account-page-profile-picture"
              src={loggedIn.profile_picture}
              alt="Profile picture"
            />

            <button className="account-page-edit-profile">Edit Profile</button>

            <hr className="account-page-hr" />

            <div className="account-page-your-posts-div">My Posts</div>

            <br />

            <PostList userId={loggedIn.id} />
          </>
        ) : (
          <>
            <button onClick={handleShowPrivatePosts}>back</button>
            <p>These posts can only be seen by you</p>
            <PostList private={true} />
          </>
        )}

        <Nav />
      </>
    );
  } else if (user) {
    return (
      <>
        <TopBar currentPage={user.username} />
        <img
          className="account-page-profile-picture"
          src={user.profile_picture}
          alt="Profile picture"
        />
        <hr className="account-page-hr" />
        <div className="account-page-your-posts-div">My Posts</div>
        <br />
        <PostList userId={user.id} />
        <Nav />
      </>
    );
  }
};

export default AccountPage;
