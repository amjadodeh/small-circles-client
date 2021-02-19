import { Switch, Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import HomePage from './HomePage/HomePage';
import ExplorePage from './ExplorePage/ExplorePage';
import AddPostPage from './AddPostPage/AddPostPage';
import MessagesPage from './MessagesPage/MessagesPage';
import AccountPage from './AccountPage/AccountPage';
import Nav from './Nav/Nav';

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/explore" component={ExplorePage} />
        <Route path="/add-post" component={AddPostPage} />
        <Route path="/messages" component={MessagesPage} />
        <Route path="/account" component={AccountPage} />
      </Switch>
      <Nav />
    </div>
  );
}

export default App;
