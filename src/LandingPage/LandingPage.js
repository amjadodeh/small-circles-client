import { useState } from 'react';
import { BiData } from 'react-icons/bi';
import { AiFillGithub, AiFillLock } from 'react-icons/ai';

import SignUpForm from '../SignUpForm/SignUpForm';
import LogInForm from '../LogInForm/LogInForm';
import scLogoOrange from '../images/sc-logo-orange.png';
import scFullWhite from '../images/sc-full-white.png';
import './LandingPage.css';

const LandingPage = () => {
  const [newUser, setNewUser] = useState(false);

  const handleClickChangeForm = () => {
    setNewUser((newUser) => !newUser);
  };

  return (
    <div className="landing-page-container">
      <div className="landing-top-section">
        <div className="landing-page-img-div">
          <img
            className="landing-page-sc-logo-orange"
            src={scLogoOrange}
            width="60px"
          />

          <img
            className="landing-page-sc-full-white"
            src={scFullWhite}
            width="300px"
          />
        </div>

        <div className="landing-form-container">
          {!newUser ? <LogInForm /> : <SignUpForm />}
          <div>
            {!newUser ? (
              <div>
                Don't have an account?{' '}
                <button
                  className="landing-change-form-btn"
                  onClick={handleClickChangeForm}
                >
                  Sign up.
                </button>
              </div>
            ) : (
              <div>
                Already have an account?
                <button
                  className="landing-change-form-btn"
                  onClick={handleClickChangeForm}
                >
                  Log in.
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="landing-bottom-section">
        <div className="landing-learn-more-div">
          <header>
            <h3>Your Data is Your Data</h3>
          </header>
          <BiData size="4em" color="#fff" />
          <p>
            Small Circles is a social platform focused on giving you control of
            your data.
          </p>
        </div>

        <div className="landing-learn-more-div">
          <header>
            <h3>Giving You Control</h3>
          </header>
          <AiFillLock size="4em" color="#fff" />
          <p>
            With every post, you decide who can see your content. You can make a
            private post that only you can see, a post to be seen by all your
            friends, or select from your friend list to share to!
          </p>
        </div>

        <div className="landing-learn-more-div">
          <header>
            <h3>Open Source</h3>
          </header>
          <AiFillGithub size="4em" color="#fff" />
          <p>Small Circles is free to use and fully open source.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
