import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { PostsProvider } from '../Context/PostsContext';
import { LoggedInProvider } from '../Context/LoggedInContext';
import { UsersProvider } from '../Context/UsersContext';
import HomePage from './HomePage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <PostsProvider>
        <LoggedInProvider>
          <UsersProvider>
            <HomePage />
          </UsersProvider>
        </LoggedInProvider>
      </PostsProvider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
