import { useState } from 'react';
import { Link } from 'react-router-dom';

import './LandingPage.css';

const LandingPage = () => {
  const [showLearn, setShowLearn] = useState(false);

  function handleClick() {
    setShowLearn((currentShowLearn) => !currentShowLearn);
  }

  return (
    <div className="landing-page-container">
      <div className="landing-page-content">
        <h1>Welcome to Small Circles! Your data is your data.</h1>
        <div>Your data is your data.</div>
        <button onClick={handleClick}>Learn more</button>
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
        <div>
          sign in here or <Link to="/home">continue without an account</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
