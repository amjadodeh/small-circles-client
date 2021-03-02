import ReactDOM from 'react-dom';
import { LoggedInProvider } from '../Context/LoggedInContext';
import { UsersProvider } from '../Context/UsersContext';
import UserList from './UserList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <LoggedInProvider>
      <UsersProvider>
        <UserList />
      </UsersProvider>
    </LoggedInProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
