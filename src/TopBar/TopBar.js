import './TopBar.css';

const TopBar = (props) => {
  return <div className="top-bar">{props.currentPage}</div>;
};

export default TopBar;
