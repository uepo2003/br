import { FormValidationErrors } from "@/types";
import { ActionFunction, json, redirect } from "react-router-dom";
export const createPostAction: ActionFunction = async ({
  request,
}): Promise<Response> => {
  const formData = await request.formData();
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  if (response.ok) {
    sessionStorage.setItem("dialogMessage", "Post successfully created");
    return redirect("/posts");
  }
  if (response.status === 401) {
    sessionStorage.setItem("dialogMessage", "You must be logged in");
    return redirect("/login");
  }
  if (response.status === 422) {
    const { errors } = (await response.json()) as {
      errors: FormValidationErrors;
    };
    return json({ errors });
  }
  throw new Response(null, { status: response.status });
};
