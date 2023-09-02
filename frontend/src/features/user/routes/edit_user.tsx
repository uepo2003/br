import { useEffect } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { useCurrentUser } from "@/hooks/current_user";
import { FormValidationErrors, User } from "@/types";

export function EditUser(): JSX.Element {
  const { user } = useLoaderData() as { user: User };
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const actionData = useActionData() as
    | { errors: FormValidationErrors }
    | undefined;
  useEffect(() => {
    if (currentUser?.id !== user.id) {
      sessionStorage.setItem("dialogMessage", "Unauthorized access");
      navigate(`/posts`, { replace: true });
      return;
    }
  }, [user, navigate, currentUser]);

  return (
    <div className="main users-new">
      <div className="container">
        <h2 className="form-heading">Edit Account</h2>
        <div className="form users-form">
          <div className="form-body">
            {actionData?.errors &&
              actionData.errors.map((error) => (
                <div
                  key={error.msg}
                  className="form-error"
                  data-test={`error-${error.path}`}
                >
                  {error.msg}
                </div>
              ))}
            <Form method="PATCH" data-test="form" encType="multipart/form-data">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                defaultValue={user.name}
                data-test="input-name"
              />
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                defaultValue={user.email}
                data-test="input-email"
              />
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="file"
                name="image"
                data-test="input-image"
              />
              <input type="submit" value="Save" data-test="submit" />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
