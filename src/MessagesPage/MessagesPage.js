import TopBar from '../TopBar/TopBar';
import PostList from '../PostList/PostList';
import Nav from '../Nav/Nav';

const MessagesPage = () => {
  return (
    <>
      <TopBar currentPage="Messages" />
      <p>These posts can only be seen by you.</p>
      <PostList onlyForYou={true} />
      <Nav />
    </>
  );
};

export default MessagesPage;
