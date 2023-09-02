import { useLoaderData } from "react-router-dom";
import { User } from "@/types";

export function AllUsers(): JSX.Element {
  const { users } = useLoaderData() as { users: User[] };
  return (
    <div className="main users-index">
      <div className="container">
        <h1 className="users-heading">All Users</h1>
        {users.map((user) => (
          <div key={user.id} className="users-index-item">
            <div className="user-left">
              <img src={user.imageName} data-test="user-item-image" />
            </div>
            <div className="user-right">
              <a href={`/users/${user.id}/`} data-test="user-item-link">
                {user.name}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
