import { useState, useContext } from 'react';

import { UsersContext } from '../Context/UsersContext';
import { LoggedInContext } from '../Context/LoggedInContext';
import './SignUpForm.css';

const SignUpForm = () => {
  const [users, setUsers] = useContext(UsersContext);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

  const [signUp, setSignUp] = useState({
    username: '',
    password: '',
    repeatPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChangeSignUp = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  const handleShowPassword = (e) => {
    setShowPassword((showPassword) => !showPassword);
  };

  const validateSignUp = () => {
    const { username, password, repeatPassword } = signUp;

    if (!username || !password || !repeatPassword) {
      return setValidationError('Please enter any missing values');
    }

    if (users.find((user) => user.username === username)) {
      return setValidationError('Username is taken');
    } else if (!/^\w+$/.test(username)) {
      return setValidationError('Invalid characters');
    } else if (username.length >= 16) {
      return setValidationError('Username must be less than 16 characters');
    }

    if (password !== repeatPassword) {
      return setValidationError('Passwords do not match');
    }

    return true;
  };

  const handleClickSignUp = (e) => {
    e.preventDefault();
    if (validateSignUp()) {
      const username = signUp.username;
      const password = signUp.password;

      const newUserSignUp = {
        id: users.length + 1,
        username,
        password,
      };

      setValidationError('');
      setUsers([...users, newUserSignUp]);

      setLoggedIn({
        id: users.length + 1,
        username,
      });
    }
  };

  return (
    <>
      <form className="signup-form">
        <div className="signup-form-username-div">
          <input
            className="signup-form-username-input"
            value={signUp.username}
            onChange={handleChangeSignUp}
            placeholder="Username"
            type="text"
            name="username"
            id="username"
            maxLength="15"
          />
        </div>
        <div className="signup-form-password-div">
          <input
            className="signup-form-password-input"
            value={signUp.password}
            onChange={handleChangeSignUp}
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
          />
        </div>
        <div className="signup-form-password-div">
          <input
            className="signup-form-password-input"
            value={signUp.repeatPassword}
            onChange={handleChangeSignUp}
            placeholder="Repeat Password"
            type="password"
            name="repeatPassword"
            id="repeatPassword"
          />
        </div>
        <div className="signup-form-error">{validationError}</div>
        <button
          className="signup-form-submit-button"
          onClick={handleClickSignUp}
          type="submit"
        >
          Sign Up
        </button>
        <button
          className="signup-form-password-show-button"
          type="button"
          style={{ bottom: validationError && '167px' }}
          onClick={handleShowPassword}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
