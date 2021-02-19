import { Link } from 'react-router-dom';

import './Nav.css';

const Nav = () => {
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
      <Link to="/account">
        <button>account</button>
      </Link>
    </nav>
  );
};

export default Nav;
