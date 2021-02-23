import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
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
      setUsers(
        users.map((user) =>
          user.id === loggedIn.id
            ? { ...user, username: username, profile_picture: profilePicture }
            : user
        )
      );
      history.push(`/account/${loggedIn.id}`);
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
      <div className="edit-profile-return-buttons">
        <button onClick={handleClickCancel}>Cancel</button>
        <button onClick={handleClickSave}>Save</button>
      </div>
      <div>
        <img
          className="edit-profile-profile-picture"
          src={profilePicture}
          alt="Profile picture"
        />
        <button onClick={handleShowChangeProfilePicture}>
          Change Profile Picture
        </button>
        {showChangeProfilePicture && (
          <div className="edit-profile-change-profile-picture-overlay">
            <div className="edit-profile-change-profile-picture-div">
              <div>
                <button onClick={handleShowChangeProfilePicture}>Back</button>
              </div>
              <div>
                <label htmlFor="profile-picture">Profile Picture</label>
                <br />
                <input
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
        <br />
        <label htmlFor="username">Username</label> <br />
        <input
          value={username}
          placeholder="Username"
          id="username"
          onChange={handleChange}
        />
        {validationError && !showChangeProfilePicture && (
          <div className="edit-profile-validation-error">{validationError}</div>
        )}
      </div>
    </div>
  );
};

export default EditProfilePage;
