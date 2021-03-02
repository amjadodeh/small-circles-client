import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { LoggedInProvider } from '../Context/LoggedInContext';
import Nav from './Nav';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <LoggedInProvider>
        <Nav />
      </LoggedInProvider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
