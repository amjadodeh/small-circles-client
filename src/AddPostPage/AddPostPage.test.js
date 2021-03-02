import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { LoggedInProvider } from '../Context/LoggedInContext';
import { UsersProvider } from '../Context/UsersContext';
import { PostsProvider } from '../Context/PostsContext';
import AddPostPage from './AddPostPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <LoggedInProvider>
        <UsersProvider>
          <PostsProvider>
            <AddPostPage />
          </PostsProvider>
        </UsersProvider>
      </LoggedInProvider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
