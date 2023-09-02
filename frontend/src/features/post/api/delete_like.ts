import { ActionFunction, redirect } from "react-router-dom";

export const deleteLikeAction: ActionFunction = async ({
  params,
}): Promise<Response> => {
  const response = await fetch(`/api/posts/${params.postId}/likes`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    return redirect(`/posts/${params.postId}`);
  }
  if (response.status === 401) {
    sessionStorage.setItem("dialogMessage", "You must be logged in");
    return redirect("/login");
  }
  throw new Response(null, { status: response.status });
};
