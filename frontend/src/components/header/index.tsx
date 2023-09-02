import { Link } from "@/components/link";
import { useCurrentUser } from "@/hooks/current_user";
import { CSSProperties } from "react";
import { Form } from "react-router-dom";

type HeaderProps = {
  sx?: CSSProperties;
};

export function Header({ sx }: HeaderProps): JSX.Element {
  const currentUser = useCurrentUser();

  return (
    <header style={sx}>
      <div className="header-logo">
        <Link to={currentUser ? "/posts" : "/"} data-test="header-logo">
          TweetApp
        </Link>
      </div>
      <ul className="header-menus">
        {currentUser ? (
          <>
            <li>
              <Link
                to={`/users/${currentUser.id}`}
                data-test="header-link-mypage"
              >
                {currentUser.name}
              </Link>
            </li>
            <li>
              <Link to="/posts" data-test="header-link-posts-index">
                Posts
              </Link>
            </li>
            <li>
              <Link to="/posts/new" data-test="header-link-posts-new">
                New post
              </Link>
            </li>
            <li>
              <Link to="/users" data-test="header-link-users-index">
                Users
              </Link>
            </li>
            <li>
              <Form method="DELETE" action="/logout">
                <button data-test="header-link-logout" type="submit">
                  Log out
                </button>
              </Form>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/about" data-test="header-link-about">
                About
              </Link>
            </li>
            <li>
              <Link to="/signup" data-test="header-link-signup">
                Sign up
              </Link>
            </li>
            <li>
              <Link to="/login" data-test="header-link-login">
                Log in
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
