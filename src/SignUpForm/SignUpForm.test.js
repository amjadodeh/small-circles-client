import ReactDOM from 'react-dom';
import { UsersProvider } from '../Context/UsersContext';
import { LoggedInProvider } from '../Context/LoggedInContext';
import SignUpForm from './SignUpForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <UsersProvider>
      <LoggedInProvider>
        <SignUpForm />
      </LoggedInProvider>
    </UsersProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
