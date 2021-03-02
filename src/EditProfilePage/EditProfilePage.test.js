import ReactDOM from 'react-dom';
import { LoggedInProvider } from '../Context/LoggedInContext';
import { UsersProvider } from '../Context/UsersContext';
import EditProfilePage from './EditProfilePage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <LoggedInProvider>
      <UsersProvider>
        <EditProfilePage />
      </UsersProvider>
    </LoggedInProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
