import { useState, useContext } from 'react';

import { UsersContext } from '../Context/UsersContext';
import { LoggedInContext } from '../Context/LoggedInContext';
import { API_BASE_URL } from '../config';
import './LogInForm.css';

const LogInForm = () => {
  const [users, setUsers] = useContext(UsersContext);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

  const [logIn, setLogIn] = useState({
    username: '',
    password: '',
    repeatPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChangeLogIn = (e) => {
    setLogIn({ ...logIn, [e.target.name]: e.target.value });
  };

  const handleShowPassword = (e) => {
    setShowPassword((showPassword) => !showPassword);
  };

  const validateLogIn = () => {
    const { username, password } = logIn;

    if (!username || !password) {
      return setValidationError('Please enter your username and password');
    }

    return true;
  };

  const handleClickLogIn = (e) => {
    e.preventDefault();
    if (validateLogIn()) {
      const username = logIn.username;
      const password = logIn.password;

      const user = users.find((user) => user.username === username);

      if (user) {
        fetch(`${API_BASE_URL}/users/login/${user.id}`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ password }),
        })
          .then((res) => {
            if (!res.ok) return res.json().then((e) => Promise.reject(e));
            return res.json();
          })
          .then((response) => {
            if (response) {
              return setLoggedIn({
                id: user.id,
                username: user.username,
                profile_picture: user.profile_picture,
                friends: user.friends
                  ? user.friends.split(',').map((NaN) => Number(NaN))
                  : [],
              });
            }
          })
          .catch((error) => {
            console.error({ error });
            return setValidationError('Incorrect password');
          });
      } else {
        return setValidationError('This user does not exist');
      }
    }
  };

  return (
    <>
      <form className="login-form">
        <div className="login-form-username-div">
          <input
            className="login-form-username-input"
            value={logIn.username}
            onChange={handleChangeLogIn}
            placeholder="Username"
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className="login-form-password-div">
          <input
            className="login-form-password-input"
            value={logIn.password}
            onChange={handleChangeLogIn}
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
          />
        </div>
        <div className="login-form-error">{validationError}</div>
        <button
          className="login-form-submit-button"
          onClick={handleClickLogIn}
          type="submit"
        >
          Log In
        </button>
        <button
          className="login-form-password-show-button"
          type="button"
          style={{ bottom: validationError && '114px' }}
          onClick={handleShowPassword}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </form>
    </>
  );
};

export default LogInForm;
