import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { BiHome, BiMessageSquare } from 'react-icons/bi';
import { IoSearch } from 'react-icons/io5';
import { RiAccountCircleLine } from 'react-icons/ri';

import { LoggedInContext } from '../Context/LoggedInContext';
import './Nav.css';

const Nav = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

  return (
    <>
      <nav className="nav">
        <NavLink
          to="/home"
          className="nav-btn-link"
          activeClassName="nav-btn-active-link"
        >
          <button className="nav-btn">
            <BiHome size="2em" title="Home" />
          </button>
        </NavLink>
        <NavLink
          to="/explore"
          className="nav-btn-link"
          activeClassName="nav-btn-active-link"
        >
          <button className="nav-btn">
            <IoSearch size="2em" title="Explore" />
          </button>
        </NavLink>

        <NavLink
          to="/messages"
          className="nav-btn-link"
          activeClassName="nav-btn-active-link"
        >
          <button className="nav-btn">
            <BiMessageSquare size="2em" title="Messages" />
          </button>
        </NavLink>
        <NavLink
          to={`/account/${loggedIn.id}`}
          className="nav-btn-link"
          activeClassName="nav-btn-active-link"
        >
          <button className="nav-btn">
            <RiAccountCircleLine size="2em" title="Account" />
          </button>
        </NavLink>
      </nav>
      <NavLink to="/add-post">
        <button className="nav-add-post-btn">
          <BiHome size="2em" color="#fff" title="Add Post" />
        </button>
      </NavLink>
    </>
  );
};

export default Nav;
