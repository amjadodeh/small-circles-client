import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IoCloseOutline, IoCheckmarkOutline } from 'react-icons/io5';
import { BiArrowBack } from 'react-icons/bi';

import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
import { API_BASE_URL } from '../config';
import TopBar from '../TopBar/TopBar';
import './EditProfilePage.css';

const EditProfilePage = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [users, setUsers] = useContext(UsersContext);

  const [profilePicture, setProfilePicture] = useState(
    () => loggedIn.profile_picture
  );
  const [username, setUsername] = useState(() => loggedIn.username);
  const [showChangeProfilePicture, setShowChangeProfilePicture] = useState(
    () => false
  );
  const [validationError, setValidationError] = useState(() => '');

  const history = useHistory();

  const fetchHelper = () => {
    fetch(`${API_BASE_URL}/users/${loggedIn.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        profile_picture: profilePicture,
      }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res;
      })
      .then((response) => {
        setUsers(
          users.map((user) =>
            user.id === loggedIn.id
              ? { ...user, username: username, profile_picture: profilePicture }
              : user
          )
        );
        return history.push(`/account/${loggedIn.id}`);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  const checkUrl = (url) => {
    return url.match(/\.(jpeg|jpg|png)$/) != null;
  };

  const isValid = () => {
    if (
      users.find(
        (user) => user.username === username && user.id !== loggedIn.id
      )
    ) {
      setValidationError('Username is taken');
      return false;
    } else if (!/^\w+$/.test(username)) {
      setValidationError('Invalid characters');
      return false;
    }

    if (!checkUrl(profilePicture)) {
      setShowChangeProfilePicture(
        (showChangeProfilePicture) => !showChangeProfilePicture
      );
      setValidationError('Not a picture url!');
      return false;
    }

    return true;
  };

  const handleClickCancel = () => {
    history.push(`/account/${loggedIn.id}`);
  };

  const handleClickSave = () => {
    if (isValid()) {
      setLoggedIn({
        ...loggedIn,
        username: username,
        profile_picture: profilePicture,
      });
      fetchHelper();
    }
  };

  const handleShowChangeProfilePicture = () => {
    setShowChangeProfilePicture(
      (showChangeProfilePicture) => !showChangeProfilePicture
    );
  };

  const handleChange = (e) => {
    if (e.target.id === 'profile-picture') {
      setProfilePicture(e.target.value);
    }

    if (e.target.id === 'username') {
      setUsername(e.target.value);
    }
  };

  return (
    <div>
      <TopBar currentPage="Edit Profile" />
      <div className="edit-profile-return-buttons">
        <button className="edit-profile-save" onClick={handleClickSave}>
          <IoCheckmarkOutline size="2.4em" color="#3acc15" title="Save" />
        </button>
        <button className="edit-profile-cancel" onClick={handleClickCancel}>
          <IoCloseOutline size="2.4em" color="#f42279" title="Cancel" />
        </button>
      </div>
      <div>
        <img
          className="edit-profile-profile-picture"
          src={profilePicture}
          alt="Profile picture"
        />
        <button
          className="edit-profile-change-profile-picture-btn"
          onClick={handleShowChangeProfilePicture}
        >
          Change Profile Picture
        </button>
        {showChangeProfilePicture && (
          <div className="edit-profile-change-profile-picture-overlay">
            <div className="edit-profile-change-profile-picture-div">
              <div>
                <button
                  className="edit-profile-back-btn"
                  onClick={handleShowChangeProfilePicture}
                >
                  <BiArrowBack size="2em" color="#f45d22" title="Back" />
                </button>
              </div>
              <div>
                <div className="edit-profile-profile-picture-label-div">
                  Profile Picture
                </div>

                <input
                  className="edit-profile-profile-picture-input"
                  value={profilePicture}
                  placeholder="Profile Picture"
                  id="profile-picture"
                  onChange={handleChange}
                />
              </div>
              {validationError && (
                <div className="edit-profile-validation-error">
                  {validationError}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="edit-profile-username-container">
          <div className="edit-profile-username-label-div">Username</div>
          <input
            className="edit-profile-username-input"
            value={username}
            placeholder="Username"
            id="username"
            onChange={handleChange}
          />
        </div>
        {validationError && !showChangeProfilePicture && (
          <div className="edit-profile-validation-error">{validationError}</div>
        )}
      </div>
    </div>
  );
};

export default EditProfilePage;
