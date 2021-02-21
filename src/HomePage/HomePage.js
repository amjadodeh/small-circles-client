import TopBar from '../TopBar/TopBar';
import PostList from '../PostList/PostList';
import Nav from '../Nav/Nav';

const HomePage = () => {
  return (
    <>
      <TopBar currentPage="Home" />
      <p>These posts are public or shared to circles you are in.</p>
      <PostList />
      <Nav />
    </>
  );
};

export default HomePage;
