import { createContext, useState } from 'react';

export const LoggedInContext = createContext();

export const LoggedInProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(() => false);
  return (
    <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
      {props.children}
    </LoggedInContext.Provider>
  );
};
