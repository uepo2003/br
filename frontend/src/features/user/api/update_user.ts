import { FormValidationErrors } from "@/types";
import { ActionFunction, json, redirect } from "react-router-dom";

export const updateUserAction: ActionFunction = async ({
  params,
  request,
}): Promise<Response> => {
  const formData = await request.formData();
  const response = await fetch(`/api/users/${params.userId}`, {
    method: "PATCH",
    body: formData,
  });
  if (response.ok) {
    sessionStorage.setItem(
      "dialogMessage",
      "Your account has been updated successfully"
    );
    return redirect(`/users/${params.userId}`);
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
