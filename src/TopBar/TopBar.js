import { Link } from 'react-router-dom';

import './TopBar.css';

const TopBar = (props) => {
  if (props.currentPage === 'Home') {
    return (
      <>
        <div className="top-bar-home">
          <span>{props.currentPage}</span>
          <Link to="/activity">
            <button>Activity</button>
          </Link>
        </div>
      </>
    );
  }
  return <div className="top-bar">{props.currentPage}</div>;
};

export default TopBar;
