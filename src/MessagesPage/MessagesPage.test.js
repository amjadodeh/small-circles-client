import { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersProvider } from '../Context/UsersContext';
import { PostsProvider } from '../Context/PostsContext';
import MessagesPage from './MessagesPage';

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
    <BrowserRouter>
      <LoggedInProvider>
        <UsersProvider>
          <PostsProvider>
            <MessagesPage />
          </PostsProvider>
        </UsersProvider>
      </LoggedInProvider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
