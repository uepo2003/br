import { useCurrentUser } from "@/hooks/current_user";
import { NavLink } from "@/components/link";
import { Profile } from "./profile";
import { Outlet, useLoaderData } from "react-router-dom";
import { User } from "@/types";
export function UserDetail(): JSX.Element {
  const currentUser = useCurrentUser();
  const { user } = useLoaderData() as { user: User };

  return (
    <>
      <div className="main user-show">
        <div className="container">
          <Profile user={user} isCurrentUser={currentUser?.id === user.id} />
          <ul className="user-tabs">
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to={`/users/${user.id}/`}
              >
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to={`/users/${user.id}/likes/`}
              >
                Likes
              </NavLink>
            </li>
          </ul>
          <Outlet />
        </div>
      </div>
    </>
  );
}
