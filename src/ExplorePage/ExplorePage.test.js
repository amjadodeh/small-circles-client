import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { PostsProvider } from '../Context/PostsContext';
import { LoggedInProvider } from '../Context/LoggedInContext';
import { UsersProvider } from '../Context/UsersContext';
import ExplorePage from './ExplorePage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <PostsProvider>
        <LoggedInProvider>
          <UsersProvider>
            <ExplorePage />
          </UsersProvider>
        </LoggedInProvider>
      </PostsProvider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
