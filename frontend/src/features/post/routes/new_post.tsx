import { Form, useActionData } from "react-router-dom";
import { FormValidationErrors } from "@/types";

export function NewPost(): JSX.Element {
  const actionData = useActionData() as
    | { errors: FormValidationErrors }
    | undefined;
  return (
    <div className="main posts-new">
      <div className="container">
        <h1 className="form-heading">Create a new post</h1>
        <Form method="POST" data-test="form">
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
              />
              <input type="submit" value="Post" data-test="submit" />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
