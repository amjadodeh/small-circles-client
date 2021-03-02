import ReactDOM from 'react-dom';
import { UsersProvider } from '../Context/UsersContext';
import { LoggedInProvider } from '../Context/LoggedInContext';
import LogInForm from './LogInForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <UsersProvider>
      <LoggedInProvider>
        <LogInForm />
      </LoggedInProvider>
    </UsersProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
