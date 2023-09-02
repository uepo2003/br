import { Form, useActionData } from "react-router-dom";
import { FormValidationErrors } from "@/types";
export function SignupForm(): JSX.Element {
  const actionData = useActionData() as { errors: FormValidationErrors };
  return (
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
        <Form data-test="form" method="POST">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" data-test="input-name" />
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" data-test="input-email" />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="off"
            data-test="input-password"
          />
          <input type="submit" value="Sign up" data-test="submit" />
        </Form>
      </div>
    </div>
  );
}
