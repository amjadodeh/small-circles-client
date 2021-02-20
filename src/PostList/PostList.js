import { useContext } from 'react';

import { PostsContext } from '../Context/PostsContext';
import './PostList.css';

const PostList = (props) => {
  const [posts, setPosts] = useContext(PostsContext);

  if (props.search) {
    return posts.find((post) =>
      post.content.toLowerCase().includes(props.search.toLowerCase())
    )
      ? posts.map(
          (post) =>
            post.content.toLowerCase().includes(props.search.toLowerCase()) && (
              <div key={post.id} className="post">
                {post.content}
              </div>
            )
        )
      : 'nothing here';
    // } else if (props.user) { // future implementation
    //   return <div></div>;
  } else {
    return posts.map((post) => (
      <div key={post.id} className="post">
        {post.content}
      </div>
    ));
  }
};

export default PostList;
