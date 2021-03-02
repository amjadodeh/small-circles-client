import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { LoggedInProvider } from '../Context/LoggedInContext';
import { UsersProvider } from '../Context/UsersContext';
import { FriendRequestsProvider } from '../Context/FriendRequestsContext';
import ActivityPage from './ActivityPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <LoggedInProvider>
        <UsersProvider>
          <FriendRequestsProvider>
            <ActivityPage />
          </FriendRequestsProvider>
        </UsersProvider>
      </LoggedInProvider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
