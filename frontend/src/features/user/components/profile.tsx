import { Link } from "@/components/link";
import { User } from "@/types";

type ProfileProps = {
  user: User;
  isCurrentUser: boolean;
};

export function Profile({ user, isCurrentUser }: ProfileProps): JSX.Element {
  return (
    <div className="user">
      <img src={user.imageName} data-test="user-image" />
      <h2 data-test="user-name">{user.name}</h2>
      <p data-test="user-email">{user.email}</p>
      {isCurrentUser ? <Link to={`/users/${user.id}/edit`}>Edit</Link> : null}
    </div>
  );
}
