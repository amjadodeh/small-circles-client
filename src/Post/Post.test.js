import ReactDOM from 'react-dom';
import { LoggedInProvider } from '../Context/LoggedInContext';
import { UsersProvider } from '../Context/UsersContext';
import Post from './Post';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <LoggedInProvider>
      <UsersProvider>
        <Post />
      </UsersProvider>
    </LoggedInProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
