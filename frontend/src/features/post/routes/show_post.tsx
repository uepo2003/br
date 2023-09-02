import { formatDate } from "@/lib/format";
import { useCurrentUser } from "@/hooks/current_user";
import { PostDetail } from "@/features/post/types";
import { Link } from "@/components/link";
import { Form, useLoaderData } from "react-router-dom";

export function ShowPost(): JSX.Element {
  const currentUser = useCurrentUser();
  const { post, likeCount, hasLiked } = useLoaderData() as PostDetail;

  return (
    <div className="main posts-show">
      <div className="container">
        <div className="posts-show-item">
          <div className="post-user-name">
            <img
              className="posts-show-item-image"
              src={post.user.imageName}
              data-test="user-image"
            />
            <Link to={`/users/${post.user.id}`} data-test="user-name">
              {post.user.name}
            </Link>
          </div>
          <p data-test="post-content">{post.content}</p>
          <div className="post-time" data-test="post-time">
            {formatDate(post.createdAt)}
          </div>
          {!hasLiked ? (
            <Form method="POST" action={`/posts/${post.id}/likes`}>
              <button
                type="submit"
                data-test="submit-like"
                className="like-btn like"
              >
                <span className="material-icons" data-test="favorite-icon">
                  favorite_border
                </span>
              </button>
            </Form>
          ) : (
            <Form method="DELETE" action={`/posts/${post.id}/likes`}>
              <button
                data-test="submit-unlike"
                className="like-btn unlike"
                type="submit"
              >
                <span className="material-icons" data-test="favorite-icon">
                  favorite
                </span>
              </button>
            </Form>
          )}

          <span data-test="like-count">{likeCount}</span>
          {post.user.id === currentUser?.id ? (
            <div className="post-menus">
              <Link to={`/posts/${post.id}/edit`} data-test="post-link-edit">
                Edit
              </Link>
              <Form method="DELETE">
                <button
                  className="text-button"
                  data-test="submit-post-delete"
                  type="submit"
                >
                  Delete
                </button>
              </Form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
