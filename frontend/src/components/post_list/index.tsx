import { PostUser } from "@/types";
import { Link } from "@/components/link";

type PostListProps = {
  posts: PostUser[];
};

export function PostList({ posts }: PostListProps): JSX.Element {
  return (
    <div data-test="posts-container">
      {posts.map((post) => (
        <div
          key={post.id}
          className="posts-index-item"
          data-test={`post-${post.id}`}
        >
          <div className="post-left">
            <img src={post.user.imageName} />
          </div>
          <div className="post-right">
            <div className="post-user-name">
              <Link to={`/users/${post.user.id}`} data-test="post-item-user">
                {post.user.name}
              </Link>
            </div>
            <Link to={`/posts/${post.id}`} data-test="post-item-content">
              {post.content}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
