import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
import FriendRequestButton from '../FriendRequestButton/FriendRequestButton';
import './UserList.css';

const UserList = (props) => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [users, setUsers] = useContext(UsersContext);

  // Search through public posts and posts shared with circle
  if (props.explore) {
    return users.find(
      (user) =>
        user.username.toLowerCase().includes(props.search.toLowerCase()) &&
        user.id !== loggedIn.id && (
          <div className="userlist-user-container" key={user.id}>
            <Link to={`/account/${user.id}`} className="userlist-user-info">
              <img src={user.profile_picture} />
              {user.username}
            </Link>
            <div className="userlist-friend-btn">
              <FriendRequestButton userId={user.id} />
            </div>
          </div>
        )
    ) ? (
      users.map(
        (user) =>
          user.username.toLowerCase().includes(props.search.toLowerCase()) &&
          user.id !== loggedIn.id && (
            <div className="userlist-user-container" key={user.id}>
              <Link to={`/account/${user.id}`} className="userlist-user-info">
                <img src={user.profile_picture} />
                {user.username}
              </Link>
              <div className="userlist-friend-btn">
                <FriendRequestButton userId={user.id} />
              </div>
            </div>
          )
      )
    ) : (
      <div className="userlist-message">
        <h2>No Results...</h2>
      </div>
    );
  }

  return <></>;
};

export default UserList;
