import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to Small Circles! Your data is your data.</h1>
      <p>
        Small Circles is a social networking service focused on making sure you
        have control of your data. With every post, you decide who can see your
        content. You can make a private post that only you can see, a public
        post to be seen by all users from the main feed, or select from your
        friend list or from your premade circle of friends to share to! You can
        even make your account private so no one can even know you have an
        account! Small Circles is free to use and fully open source.
      </p>
      <p>
        sign in here or <Link to="/home">continue without an account</Link>
      </p>
    </div>
  );
};

export default LandingPage;
