import { FormValidationErrors, User } from "@/types";
import { ActionFunction, json, redirect } from "react-router-dom";
export const signupAction: ActionFunction = async ({
  request,
}): Promise<Response> => {
  const formData = await request.formData();
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  if (response.ok) {
    sessionStorage.setItem("dialogMessage", "You have signed up successfully");
    const { user } = (await response.json()) as { user: User };
    return redirect(`/users/${user.id}/`);
  }
  if (response.status === 422) {
    const { errors } = (await response.json()) as {
      errors: FormValidationErrors;
    };
    return json({ errors });
  }

  if (response.status === 403) {
    sessionStorage.setItem("dialogMessage", "You are already logged in");
    return redirect("/posts");
  }

  throw new Response(null, { status: response.status });
};
