import { PostDetail } from "@/features/post/types";
import { useCurrentUser } from "@/hooks/current_user";
import { useEffect } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { FormValidationErrors } from "@/types";

export function EditPost(): JSX.Element {
  const { post } = useLoaderData() as PostDetail;
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const actionData = useActionData() as
    | { errors: FormValidationErrors }
    | undefined;
  useEffect(() => {
    if (currentUser?.id !== post.user.id) {
      sessionStorage.setItem("dialogMessage", "Unauthorized access");
      navigate(`/posts`, { replace: true });
      return;
    }
  }, [post, navigate, currentUser]);

  return (
    <div className="main posts-new">
      <div className="container">
        <h1 className="form-heading">Edit a post</h1>
        <Form method="PATCH" data-test="form">
          <div className="form">
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
              <textarea
                name="content"
                data-test="textarea-content"
                defaultValue={post.content}
              />
              <input type="submit" value="Save" data-test="submit" />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
