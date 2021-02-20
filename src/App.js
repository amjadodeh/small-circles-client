import { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import { UsersProvider } from './Context/UsersContext';
import { PostsProvider } from './Context/PostsContext';
import { LoggedInContext } from './Context/LoggedInContext';
import LandingPage from './LandingPage/LandingPage';
import HomePage from './HomePage/HomePage';
import ExplorePage from './ExplorePage/ExplorePage';
import AddPostPage from './AddPostPage/AddPostPage';
import MessagesPage from './MessagesPage/MessagesPage';
import AccountPage from './AccountPage/AccountPage';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

  return (
    <UsersProvider>
      <PostsProvider>
        <div className="App">
          {loggedIn ? (
            <Switch>
              <Route path="/explore" component={ExplorePage} />
              <Route path="/add-post" component={AddPostPage} />
              <Route path="/messages" component={MessagesPage} />
              <Route path="/account" component={AccountPage} />
              <Route path="/" component={HomePage} />
            </Switch>
          ) : (
            <LandingPage />
          )}
        </div>
      </PostsProvider>
    </UsersProvider>
  );
}

export default App;
