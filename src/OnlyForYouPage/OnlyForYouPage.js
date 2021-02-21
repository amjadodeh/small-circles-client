import TopBar from '../TopBar/TopBar';
import PostList from '../PostList/PostList';
import Nav from '../Nav/Nav';

const OnlyForYouPage = () => {
  return (
    <>
      <TopBar currentPage="Only For You" />
      <p>These posts can only be seen by you.</p>
      <PostList onlyForYou={true} />
      <Nav />
    </>
  );
};

export default OnlyForYouPage;
