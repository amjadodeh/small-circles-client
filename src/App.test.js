import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { LoggedInProvider } from './Context/LoggedInContext';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <LoggedInProvider>
        <App />
      </LoggedInProvider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
