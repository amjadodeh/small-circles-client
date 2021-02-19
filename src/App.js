import { Switch, Route } from 'react-router-dom';

import { PostsProvider } from './PostsContext';
import LandingPage from './LandingPage/LandingPage';
import HomePage from './HomePage/HomePage';
import ExplorePage from './ExplorePage/ExplorePage';
import AddPostPage from './AddPostPage/AddPostPage';
import MessagesPage from './MessagesPage/MessagesPage';
import AccountPage from './AccountPage/AccountPage';
import './App.css';

function App() {
  return (
    <PostsProvider>
      <div className="App">
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/explore" component={ExplorePage} />
          <Route path="/add-post" component={AddPostPage} />
          <Route path="/messages" component={MessagesPage} />
          <Route path="/account" component={AccountPage} />
        </Switch>
      </div>
    </PostsProvider>
  );
}

export default App;
