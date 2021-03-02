import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { LoggedInProvider } from '../Context/LoggedInContext';
import { UsersProvider } from '../Context/UsersContext';
import { FriendRequestsProvider } from '../Context/FriendRequestsContext';
import { PostsProvider } from '../Context/PostsContext';
import AccountPage from './AccountPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <LoggedInProvider>
        <UsersProvider>
          <FriendRequestsProvider>
            <PostsProvider>
              <AccountPage />
            </PostsProvider>
          </FriendRequestsProvider>
        </UsersProvider>
      </LoggedInProvider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
