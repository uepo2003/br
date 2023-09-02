import { ActionFunction, redirect } from "react-router-dom";

export const logoutAction: ActionFunction = async (): Promise<Response> => {
  const response = await fetch("/api/auth/logout", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    sessionStorage.setItem("dialogMessage", "You have logged out successfully");
    return redirect("/login");
  }
  throw new Response(null, { status: response.status });
};
