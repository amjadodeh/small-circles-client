import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { LoggedInContext } from '../Context/LoggedInContext';
import './Nav.css';

const Nav = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

  return (
    <nav className="nav">
      <Link to="/home">
        <button>home</button>
      </Link>
      <Link to="/explore">
        <button>explore</button>
      </Link>
      <Link to="/add-post">
        <button>add post</button>
      </Link>
      <Link to="/messages">
        <button>messages</button>
      </Link>
      <Link to={`/account/${loggedIn.id}`}>
        <button>account</button>
      </Link>
    </nav>
  );
};

export default Nav;
