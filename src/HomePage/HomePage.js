import TopBar from '../TopBar/TopBar';
import PostList from '../PostList/PostList';
import Nav from '../Nav/Nav';
import './HomePage.css';

const HomePage = () => {
  return (
    <>
      <TopBar currentPage="Home" />
      <p className="home-page-p">
        These posts are shared with circles you are in.
      </p>
      <PostList home={true} />
      <Nav />
    </>
  );
};

export default HomePage;
