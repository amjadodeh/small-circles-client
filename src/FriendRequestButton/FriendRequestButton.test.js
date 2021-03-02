import { useState } from 'react';
import ReactDOM from 'react-dom';
import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersProvider } from '../Context/UsersContext';
import { FriendRequestsProvider } from '../Context/FriendRequestsContext';
import FriendRequestButton from './FriendRequestButton';

const LoggedInProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(() => ({ friends: [] }));
  return (
    <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
      {props.children}
    </LoggedInContext.Provider>
  );
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <LoggedInProvider>
      <UsersProvider>
        <FriendRequestsProvider>
          <FriendRequestButton />
        </FriendRequestsProvider>
      </UsersProvider>
    </LoggedInProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
