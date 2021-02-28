import { Link } from 'react-router-dom';
import { BiNotification } from 'react-icons/bi';

import './TopBar.css';

const TopBar = (props) => {
  if (props.currentPage === 'Home') {
    return (
      <>
        <div className="top-bar-home">
          <span>{props.currentPage}</span>
          <Link to="/activity" className="top-bar-home-activity">
            <button className="top-bar-home-activity">
              <BiNotification size="2.3em" color="#f45d22" title="Activity" />
            </button>
          </Link>
        </div>
      </>
    );
  }
  return <div className="top-bar">{props.currentPage}</div>;
};

export default TopBar;
