import { useState } from 'react';
import { Link } from 'react-router-dom';

import SignUpForm from '../SignUpForm/SignUpForm';
import LogInForm from '../LogInForm/LogInForm';
import './LandingPage.css';

const LandingPage = () => {
  const [showLearn, setShowLearn] = useState(false);
  const [newUser, setNewUser] = useState(false);

  const handleClickLearn = () => {
    setShowLearn((currentShowLearn) => !currentShowLearn);
  };

  const handleClickChangeForm = () => {
    setNewUser((newUser) => !newUser);
  };

  return (
    <div className="landing-page-container">
      <div className="landing-page-content">
        <h1>Small Circles</h1>
        <p>Your data is your data.</p>

        <div className="landing-form-container">
          {!newUser ? <LogInForm /> : <SignUpForm />}
        </div>

        <button onClick={handleClickLearn}>
          Learn more about Small Circles
        </button>
        {showLearn && (
          <div>
            Small Circles is a social networking service focused on giving you
            control of your data. With every post, you decide who can see your
            content. You can make a private post that only you can see, a public
            post to be seen by all other users from the main feed, or select
            from your friend list or from your premade circle of friends to
            share to! You can even make your account private so no one can even
            know you have an account! Small Circles is free to use and fully
            open source.
          </div>
        )}

        <hr className="landing-hr" />

        {!newUser ? (
          <div>
            Don't have an account?{' '}
            <button onClick={handleClickChangeForm}>Sign up.</button>
          </div>
        ) : (
          <div>
            Already have an account?{' '}
            <button onClick={handleClickChangeForm}>Log in.</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
