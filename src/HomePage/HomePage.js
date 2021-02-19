import TopBar from '../TopBar/TopBar';
import PostList from '../PostList/PostList';
import Nav from '../Nav/Nav';

const HomePage = () => {
  return (
    <>
      <TopBar currentPage="Home" />
      <PostList />
      <Nav />
    </>
  );
};

export default HomePage;
