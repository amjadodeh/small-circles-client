import ReactDOM from 'react-dom';
import { UsersProvider } from '../Context/UsersContext';
import { LoggedInProvider } from '../Context/LoggedInContext';
import LandingPage from './LandingPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <UsersProvider>
      <LoggedInProvider>
        <LandingPage />
      </LoggedInProvider>
    </UsersProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
