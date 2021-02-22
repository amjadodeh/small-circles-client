import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { LoggedInContext } from '../Context/LoggedInContext';
import { UsersContext } from '../Context/UsersContext';
import './Post.css';

const Post = (props) => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [users, setUsers] = useContext(UsersContext);

  const postUser = users.find((user) => user.id === props.postUserId);
  const friendUser = users.find((user) => user.id === props.friend);

  if (props.private) {
    return (
      <div className="post">
        <div>{loggedIn.id === props.postUserId}</div>
        {props.content}
        <div>Only for you</div>
      </div>
    );
  }

  if (props.messages) {
    if (loggedIn.id === props.postUserId) {
      return <div className="right-message">{props.content}</div>;
    } else {
      return <div className="left-message">{props.content}</div>;
    }
  }

  if (props.sharedWithCircle) {
    return (
      <div className="post">
        <div>
          <Link to={`/account/${postUser.id}`}>{postUser.username}</Link>
        </div>
        {props.content}
        <div>Shared with Circle</div>
      </div>
    );
  }

  if (props.public) {
    return (
      <div className="post">
        <div>
          <Link to={`/account/${postUser.id}`}>{postUser.username}</Link>
        </div>
        {props.content}
        <div>Public Post</div>
      </div>
    );
  }
};

export default Post;