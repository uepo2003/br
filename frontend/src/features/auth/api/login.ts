import { FormValidationErrors } from "@/types";
import { ActionFunction, json, redirect } from "react-router-dom";

export const loginWithEmailAndPasswordAction: ActionFunction = async ({
  request,
}) => {
  const fprmData = await request.formData();
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(fprmData)),
  });
  if (response.ok) {
    sessionStorage.setItem("dialogMessage", "You have logged in successfully");
    return redirect(`/posts`);
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
