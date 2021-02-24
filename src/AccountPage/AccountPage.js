import { useContext, useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';

import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
import TopBar from '../TopBar/TopBar';
import FriendRequestButton from '../FriendRequestButton/FriendRequestButton';
import PostList from '../PostList/PostList';
import Nav from '../Nav/Nav';
import './AccountPage.css';

const AccountPage = (props) => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [users, setUsers] = useContext(UsersContext);

  const [showMoreOptions, setShowMoreOptions] = useState(() => false);
  const [showPrivatePosts, setShowPrivatePosts] = useState(() => false);
  const [showAccountSettings, setShowAccountSettings] = useState(() => false);
  const [signOutStart, setSignOutStart] = useState(false);
  const [deletionStart, setDeletionStart] = useState(false);
  const [deletionInput, setDeletionInput] = useState('');
  const [deleteError, setDeleteError] = useState('');

  const location = useLocation();
  const history = useHistory();

  const handleShowMoreOptions = () => {
    setShowMoreOptions((showMoreOptions) => !showMoreOptions);
  };

  const handleShowPrivatePosts = () => {
    setShowPrivatePosts((showPrivatePosts) => !showPrivatePosts);
  };

  const handleShowAccountSettings = () => {
    setShowAccountSettings((showAccountSettings) => !showAccountSettings);
  };

  const handleClickSignOut = (yes) => {
    if (!signOutStart) {
      return setSignOutStart(true);
    }

    if (!yes) {
      return setSignOutStart(false);
    }

    if (yes) {
      return setLoggedIn(false);
    }
  };

  const handleClickDeleteAccount = (DELETE) => {
    if (!deletionStart) {
      return setDeletionStart(true);
    }

    if (DELETE === 'Cancel') {
      return setDeletionStart(false);
    }

    if (DELETE === 'DELETE ACCOUNT') {
      if (deletionInput === loggedIn.username) {
        setUsers(users.filter((user) => user.id !== loggedIn.id));
        setLoggedIn(false);
        return history.push('/');
      } else {
        return setDeleteError('Incorrect username');
      }
    }
  };

  const onChangeDeletionInput = (e) => {
    setDeletionInput(e.target.value);
  };

  const handleClickBack = () => {
    history.goBack();
  };

  const userId = Number(location.pathname.replace('/account/', ''));
  const user = users.find((user) => user.id === userId);

  if (loggedIn.id === userId) {
    return (
      <>
        <TopBar currentPage={loggedIn.username} />

        {showPrivatePosts ? (
          <>
            <button onClick={handleShowPrivatePosts}>back</button>
            <p>These posts can only be seen by you</p>
            <PostList private={true} />
          </>
        ) : showAccountSettings ? (
          <>
            <button onClick={handleShowAccountSettings}>back</button>
            <br />
            <br />
            {!signOutStart && !deletionStart && (
              <>
                <button onClick={handleClickSignOut}>Sign Out</button>
                <button onClick={handleClickDeleteAccount}>
                  Delete Account
                </button>
              </>
            )}

            {signOutStart && (
              <>
                <button onClick={() => handleClickSignOut(false)}>no</button>
                <button onClick={() => handleClickSignOut(true)}>yes</button>
              </>
            )}

            {deletionStart && (
              <>
                <div>
                  <span style={{ color: 'red' }}>PLEASE READ CAREFULLY:</span>
                  <br />
                  Deleting an account is <b>permanent</b>. Your account and{' '}
                  <b>all data</b> linked to it will be lost forever.{' '}
                  <b>This CAN NOT be reversed!</b> If you understand and still
                  want to continue, enter your username below and submit.
                </div>
                <p style={{ color: 'gray' }}>
                  <i>{loggedIn.username}</i>
                </p>
                <input
                  type="text"
                  placeholder="Enter username here"
                  id="account-page-account-deletion"
                  name="account-page-account-deletion"
                  value={deletionInput}
                  style={{ textAlign: 'center' }}
                  onChange={onChangeDeletionInput}
                  required
                />
                <br />
                {deleteError && (
                  <span className="account-page-delete-error">
                    {deleteError}
                  </span>
                )}
                <br />
                <button onClick={() => handleClickDeleteAccount('Cancel')}>
                  Cancel
                </button>
                <button
                  onClick={() => handleClickDeleteAccount('DELETE ACCOUNT')}
                >
                  DELETE ACCOUNT
                </button>
              </>
            )}
          </>
        ) : showMoreOptions ? (
          <>
            <button onClick={handleShowMoreOptions}>back</button>
            <button
              className="account-page-private-posts-button"
              onClick={handleShowPrivatePosts}
            >
              Private Posts
            </button>

            <button
              className="account-page-account-settings-button"
              onClick={handleShowAccountSettings}
            >
              Account Settings
            </button>
          </>
        ) : (
          <>
            <button
              className="account-page-more-options-button"
              onClick={handleShowMoreOptions}
            >
              More Options
            </button>

            <img
              className="account-page-profile-picture"
              src={loggedIn.profile_picture}
              alt="Profile picture"
            />

            <Link to={`/edit-profile/${loggedIn.id}`}>
              <button className="account-page-edit-profile">
                Edit Profile
              </button>
            </Link>

            <hr className="account-page-hr" />

            <div className="account-page-your-posts-div">My Posts</div>

            <br />

            <PostList userId={loggedIn.id} />
          </>
        )}

        <Nav />
      </>
    );
  } else if (user) {
    return (
      <>
        <TopBar currentPage={user.username} />
        <button onClick={handleClickBack}>Back</button>
        <img
          className="account-page-profile-picture"
          src={user.profile_picture}
          alt="Profile picture"
        />
        <FriendRequestButton userId={userId} />
        <hr className="account-page-hr" />
        <div className="account-page-your-posts-div">
          {user.username}'s Posts
        </div>
        <br />
        <PostList userId={user.id} />
        <Nav />
      </>
    );
  } else {
    return <>{history.push('/')}</>;
  }
};

export default AccountPage;
