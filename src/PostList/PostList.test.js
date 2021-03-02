import ReactDOM from 'react-dom';
import { PostsProvider } from '../Context/PostsContext';
import { LoggedInProvider } from '../Context/LoggedInContext';
import { UsersProvider } from '../Context/UsersContext';
import PostList from './PostList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <PostsProvider>
      <LoggedInProvider>
        <UsersProvider>
          <PostList />
        </UsersProvider>
      </LoggedInProvider>
    </PostsProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
