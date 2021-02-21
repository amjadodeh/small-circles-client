import { useContext } from 'react';

import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
import './Post.css';

const Post = (props) => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [users, setUsers] = useContext(UsersContext);

  if (props.onlyForYou) {
    return (
      <div className="post">
        <div>
          {loggedIn.id === props.postUserId
            ? 'Note to Self'
            : `From: ${
                users.find((user) => user.id === props.postUserId).username
              }`}
        </div>
        {props.content}
        <div>Only For You</div>
      </div>
    );
  }
  if (props.private) {
    return (
      <div className="post">
        {props.content}
        <div>Private Post</div>
      </div>
    );
  }
  return (
    <div className="post">
      {props.content}
      <div>Public Post</div>
    </div>
  );
};

export default Post;
