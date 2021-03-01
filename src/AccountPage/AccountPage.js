import { useContext, useState, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { BiArrowBack } from 'react-icons/bi';

import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
import { FriendRequestsContext } from '../Context/FriendRequestsContext';
import { API_BASE_URL } from '../config';
import TopBar from '../TopBar/TopBar';
import FriendRequestButton from '../FriendRequestButton/FriendRequestButton';
import PostList from '../PostList/PostList';
import Nav from '../Nav/Nav';
import './AccountPage.css';

const AccountPage = (props) => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [users, setUsers] = useContext(UsersContext);
  const [friendRequests, setFriendRequests] = useContext(FriendRequestsContext);

  const [showMoreOptions, setShowMoreOptions] = useState(() => false);
  const [showPrivatePosts, setShowPrivatePosts] = useState(() => false);
  const [showAccountSettings, setShowAccountSettings] = useState(() => false);
  const [signOutStart, setSignOutStart] = useState(false);
  const [deletionStart, setDeletionStart] = useState(false);
  const [deletionInput, setDeletionInput] = useState('');
  const [deleteError, setDeleteError] = useState('');

  const location = useLocation();
  const history = useHistory();

  const userId = Number(location.pathname.replace('/account/', ''));
  const user = users.find((user) => user.id === userId);

  const updateFriendRequestsContext = () => {
    fetch(`${API_BASE_URL}/friendRequests`, {
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
        return setFriendRequests(response);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  useEffect(() => {
    if (user && loggedIn.id !== userId) {
      const fetchInterval = setInterval(updateFriendRequestsContext, 1000);
      return () => {
        clearInterval(fetchInterval);
      };
    }
  }, []);

  const handleShowMoreOptions = () => {
    setShowMoreOptions((showMoreOptions) => !showMoreOptions);
  };

  const handleShowPrivatePosts = () => {
    setShowPrivatePosts((showPrivatePosts) => !showPrivatePosts);
  };

  const handleShowAccountSettings = () => {
    setShowAccountSettings((showAccountSettings) => !showAccountSettings);
  };

  const fetchDeleteLoggedInHelper = (id) => {
    fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((response) => {
        return setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error({ error });
      });
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
        fetchDeleteLoggedInHelper(loggedIn.id);
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

  if (loggedIn.id === userId) {
    return (
      <>
        <TopBar currentPage={loggedIn.username} />

        <div className="account-page-account-container">
          {showPrivatePosts ? (
            <>
              <button
                className="account-page-back-btn"
                onClick={handleShowPrivatePosts}
              >
                <BiArrowBack size="2.2em" color="#f45d22" title="Back" />
              </button>
              <p className="account-page-p">
                These posts can only be seen by you
              </p>
              <PostList private={true} />
            </>
          ) : showAccountSettings ? (
            <>
              {!signOutStart && !deletionStart && (
                <>
                  <button
                    className="account-page-back-btn"
                    onClick={handleShowAccountSettings}
                  >
                    <BiArrowBack size="2.2em" color="#f45d22" title="Back" />
                  </button>

                  <button
                    className="account-page-settings-top-button"
                    onClick={handleClickSignOut}
                  >
                    Sign Out
                  </button>
                  <button
                    className="account-page-settings-button"
                    onClick={handleClickDeleteAccount}
                  >
                    Delete Account
                  </button>
                </>
              )}

              {signOutStart && (
                <>
                  <div className="account-page-settings-text">
                    Sign out now?
                  </div>
                  <button
                    className="account-page-settings-button"
                    onClick={() => handleClickSignOut(true)}
                  >
                    Yes
                  </button>
                  <button
                    className="account-page-settings-button"
                    onClick={() => handleClickSignOut(false)}
                  >
                    No
                  </button>
                </>
              )}

              {deletionStart && (
                <>
                  <div className="account-page-settings-text">
                    <span style={{ color: 'red' }}>PLEASE READ CAREFULLY:</span>
                    <br />
                    Deleting an account is <b>permanent</b>. Your account and{' '}
                    <b>all data</b> linked to it will be lost forever.{' '}
                    <b>This CAN NOT be reversed!</b> If you understand and still
                    want to continue, enter your username below and submit.
                  </div>
                  <p
                    className="account-page-settings-account-username"
                    style={{ color: 'gray' }}
                  >
                    <i>{loggedIn.username}</i>
                  </p>
                  <input
                    className="account-page-account-deletion-input"
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
                  <button
                    className="account-page-settings-button"
                    onClick={() => handleClickDeleteAccount('Cancel')}
                  >
                    Cancel
                  </button>
                  <button
                    className="account-page-settings-button"
                    onClick={() => handleClickDeleteAccount('DELETE ACCOUNT')}
                    style={{ color: 'red' }}
                  >
                    DELETE ACCOUNT
                  </button>
                </>
              )}
            </>
          ) : showMoreOptions ? (
            <>
              <button
                className="account-page-back-btn"
                onClick={handleShowMoreOptions}
              >
                <BiArrowBack size="2.2em" color="#f45d22" title="Back" />
              </button>
              <button
                className="account-page-settings-top-button"
                onClick={handleShowPrivatePosts}
              >
                Private Posts
              </button>

              <button
                className="account-page-settings-button"
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
                <FiSettings size="2.2em" color="#f45d22" title="More Options" />
              </button>

              <img
                className="account-page-profile-picture"
                src={loggedIn.profile_picture}
                alt="Profile picture"
              />

              <Link
                to={`/edit-profile/${loggedIn.id}`}
                className="account-page-edit-profile"
              >
                Edit Profile
              </Link>

              <hr className="account-page-hr" />

              <div className="account-page-your-posts-div">My Posts</div>

              <br />

              <PostList userId={loggedIn.id} />
            </>
          )}
        </div>

        <Nav />
      </>
    );
  } else if (user) {
    return (
      <>
        <TopBar currentPage={user.username} />

        <div className="account-page-account-container">
          <button className="account-page-back-btn" onClick={handleClickBack}>
            <BiArrowBack size="2.2em" color="#f45d22" title="Back" />
          </button>
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
        </div>

        <Nav />
      </>
    );
  } else {
    return <>{history.push('/')}</>;
  }
};

export default AccountPage;
