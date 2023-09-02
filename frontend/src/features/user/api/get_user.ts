import { LoaderFunction, redirect } from "react-router-dom";

export const getUserLoader: LoaderFunction = async ({
  params,
}): Promise<Response> => {
  const response = await fetch(`/api/users/${params.userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    return response;
  }
  if (response.status === 401) {
    sessionStorage.setItem("dialogMessage", "You must be logged in");
    return redirect("/login");
  }
  throw new Response(null, { status: response.status });
};
