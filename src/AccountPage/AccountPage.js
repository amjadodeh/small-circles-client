import { useContext } from 'react';
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
  const location = useLocation();

  const userId = Number(location.pathname.replace('/account/', ''));
  const user = users.find((user) => user.id === userId);

  if (loggedIn.id === userId) {
    return (
      <>
        <TopBar currentPage={loggedIn.username} />
        <img
          className="account-page-profile-picture"
          src={loggedIn.profile_picture}
          alt="Profile picture"
        />
        <hr className="account-page-hr" />
        <div className="account-page-your-posts-div">My Posts</div>
        <br />
        <PostList userId={loggedIn.id} />
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
