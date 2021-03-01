import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdPublic } from 'react-icons/md';
import { FaLock, FaUserFriends } from 'react-icons/fa';

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
        <div className="post-post-info">
          <FaLock size="1em" title="Only for you" />
        </div>
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
        <Link to={`/account/${postUser.id}`} className="post-user-info">
          <img src={postUser.profile_picture} />
          {postUser.username}
        </Link>
        {props.content}
        <div className="post-post-info">
          <FaUserFriends size="1.1em" title="Shared with Circle" />
        </div>
      </div>
    );
  }

  if (props.sharedWithFriends) {
    return (
      <div className="post">
        <Link to={`/account/${postUser.id}`} className="post-user-info">
          <img src={postUser.profile_picture} />
          {postUser.username}
        </Link>
        {props.content}
        <div className="post-post-info">
          <MdPublic size="1.2em" title="Shared With Friends" />
        </div>
      </div>
    );
  }
};

export default Post;
