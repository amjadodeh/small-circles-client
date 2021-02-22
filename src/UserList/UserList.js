import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
import './UserList.css';

const UserList = (props) => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [users, setUsers] = useContext(UsersContext);

  // Search through public posts and posts shared with circle
  if (props.explore) {
    return (
      users.map(
        (user) =>
          user.username.toLowerCase().includes(props.search.toLowerCase()) &&
          user.id !== loggedIn.id && (
            <div className="userlist-user-container" key={isSecureContext.id}>
              <Link to={`/account/${user.id}`}>{user.username}</Link>
              {loggedIn.friends.includes(user.id) ? (
                <button>Friends</button>
              ) : (
                <button>Send Friend Request</button>
              )}
            </div>
          )
      ) || 'nothing here'
    );
  }
};

export default UserList;
